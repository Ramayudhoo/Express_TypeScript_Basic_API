import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        products: true,
      },
    });

    return res.status(200).json({
      message: "Success get all users",
      data: users,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch users",
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to create user",
    });
  }
};
