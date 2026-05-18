import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";
import { TransferInput } from "../validations/transferSchema";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: { products: true },
    });
    return res.status(200).json({
      message: "Success get all users",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await prisma.user.create({
      data: { name, email, password },
    });
    return res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

export const transferPoints = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { senderId, receiverId, amount } = req.body as TransferInput;

  if (senderId === receiverId) {
    res.status(400).json({
      status: "error",
      message: "Sender and receiver cannot be the same user",
    });
    return;
  }

  try {
    await prisma.$transaction(async (tx) => {
      const sender = await tx.user.findUnique({ where: { id: senderId } });
      if (!sender) {
        throw new Error(`Sender with id ${senderId} not found`);
      }

      const receiver = await tx.user.findUnique({ where: { id: receiverId } });
      if (!receiver) {
        throw new Error(`Receiver with id ${receiverId} not found`);
      }

      if (sender.point < amount) {
        throw new Error(
          `Insufficient points. Sender has ${sender.point} points, tried to send ${amount}`,
        );
      }

      await tx.user.update({
        where: { id: senderId },
        data: { point: { decrement: amount } },
      });

      await tx.user.update({
        where: { id: receiverId },
        data: { point: { increment: amount } },
      });
    });

    res.status(200).json({
      status: "success",
      message: "Points transferred successfully",
    });
  } catch (error) {
    next(error);
  }
};
