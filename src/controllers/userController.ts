import { Request, Response } from "express";

export const hello = (req: Request, res: Response) => {
  return res.send("Hello World");
};

export const profile = (req: Request, res: Response) => {
  const { name } = req.params;

  return res.json({
    message: `Hello ${name}`,
  });
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  return res.json({
    message: "Login Success",
    data: {
      email,
      password,
    },
  });
};
