import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description } = req.body;
    const userId = (req as any).user.userId;
    const image = req.file ? req.file.filename : null;
    console.log(req.file);
    const newProduct = await prisma.product.create({
      data: {
        name: name,
        price: Number(price),
        description: description,
        userId: Number(userId),
        image: image,
      },
    });

    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create product" });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { search, minPrice, sortBy } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: search as string,
          mode: "insensitive",
        },
        price: {
          gte: minPrice ? Number(minPrice) : 0,
        },
      },
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: sortBy === "oldest" ? "asc" : "desc",
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    const total_data = await prisma.product.count();

    return res.status(200).json({
      message: "Products fetched successfully",
      meta: {
        currentPage: page,
        limit: limit,
        total_data: total_data,
        total_page: Math.ceil(total_data / limit),
      },
      products: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json({
      message: "Product fetched successfully",
      product: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const image = req.file ? req.file.filename : null;
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: name,
        price: Number(price),
        description: description,
        image: image,
      },
    });
    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProduct = await prisma.product.delete({
      where: { id: Number(id) },
    });
    return res.status(200).json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete product" });
  }
};
