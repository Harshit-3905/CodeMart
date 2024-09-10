import { z } from "zod";

export const signupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;

export const createproductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string(),
  categoryId: z.string(),
  stock: z.number(),
  image: z.string(),
});
export const updateproductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.string().optional(),
  categoryId: z.string().optional(),
  stock: z.number().optional(),
  image: z.string().optional(),
});

export type CreateProductSchema = z.infer<typeof createproductSchema>;
export type UpdateProductSchema = z.infer<typeof updateproductSchema>;
