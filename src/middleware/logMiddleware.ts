import { Request, Response, NextFunction } from "express";

export const logMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  const originalJson = res.json.bind(res);

  let responseMessage = "";

  res.json = (body: any) => {
    if (body?.message) responseMessage = body.message;
    if (body?.error) responseMessage = body.error;
    return originalJson(body);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;

    const statusText =
      status >= 500
        ? "Server Error"
        : status >= 400
          ? "Client Error"
          : status >= 300
            ? "Redirection"
            : status >= 200
              ? "Success"
              : "Informational";

    const messagePart = responseMessage ? ` - ${responseMessage}` : "";
    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms) ${statusText}${messagePart}`,
    );
  });

  next();
};
