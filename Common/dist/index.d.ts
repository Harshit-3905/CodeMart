import { z } from "zod";
export declare const signupSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export declare const createproductSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    image: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    price: number;
    image: string;
}, {
    name: string;
    description: string;
    price: number;
    image: string;
}>;
export declare const updateproductSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    image: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    price?: number | undefined;
    image?: string | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    price?: number | undefined;
    image?: string | undefined;
}>;
export type CreateProductSchema = z.infer<typeof createproductSchema>;
export type UpdateProductSchema = z.infer<typeof updateproductSchema>;
