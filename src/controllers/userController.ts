import { Request, Response } from "express";

const users = [
  {
    id: 1,
    name: "Rama",
    email: "rama@gmail.com",
    password: "123456",
  },
  {
    id: 2,
    name: "Budi",
    email: "budi@gmail.com",
    password: "abcdef",
  },
];

export const hello = (req: Request, res: Response) => {
  return res.send("Hello World");
};

export const getAllUsers = (req: Request, res: Response) => {
  return res.json({
    message: "Success get all users",
    data: users,
  });
};

export const getUserById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  return res.json({
    message: "Success get user",
    data: user,
  });
};

export const login = (req: Request, res: Response) => {
  const { id, name, email, password } = req.body;

  const newUser = {
    id,
    name,
    email,
    password,
  };

  users.push(newUser);

  return res.json({
    message: "User created successfully",
    data: newUser,
  });
};
