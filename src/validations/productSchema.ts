import { z } from "zod";
export const createProductSchema = z.object({
  name: z.string().min(1, "Nama harus diisi!"),
  price: z.coerce.number().positive("Harga harus berupa angka positif!"),
  description: z.string().optional(),
  userId: z.coerce
    .number()
    .int("User ID  harus berupa angka bulat")
    .positive("User ID harus positif"),
});
