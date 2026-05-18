import { z } from "zod";

export const transferSchema = z.object({
  senderId: z.coerce
    .number({ error: "senderId harus berupa angka positif" })
    .int()
    .positive(),

  receiverId: z.coerce
    .number({ error: "receiverId harus berupa angka positif" })
    .int()
    .positive(),

  amount: z.coerce
    .number({ error: "amount harus berupa angka positif" })
    .int()
    .positive(),
});

export type TransferInput = z.infer<typeof transferSchema>;
