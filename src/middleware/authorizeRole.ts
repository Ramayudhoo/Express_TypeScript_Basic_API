import { Request, Response, NextFunction } from "express";

export const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user;
    try {
      if (!userRole) {
        return res.status(401).json({ message: "anda belum terautentikasi" });
      }
      if (!allowedRoles.includes(userRole.role)) {
        return res.status(401).json({
          message: `akses ditolak! fitur ini hanya untuk ${allowedRoles.join(", ")}`,
        });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Terjadi kesalahan server" });
    }
  };
};
