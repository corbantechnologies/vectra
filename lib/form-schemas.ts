import { z } from "zod";

export const kategoriaSchema = z.object({
  name: z.string().min(2, "Category name is too short"),
  is_shared: z.boolean(),
});

export type KategoriaFormValues = z.infer<typeof kategoriaSchema>;

export const semikategoriaSchema = z.object({
  name: z.string().min(2, "Subcategory name is too short"),
  kategoria: z.string().min(1, "Category is required"), // reference
});

export type SemiKategoriaFormValues = z.infer<typeof semikategoriaSchema>;

export const transactionSchema = z.object({
  transaction_type: z.enum(["IN", "EXP"]),
  transaction_method: z.enum(["CASH", "CARD"]),
  amount: z.string().min(1, "Amount is required").refine(val => !isNaN(Number(val)) && Number(val) > 0, "Amount must be a positive number"),
  date: z.string().min(1, "Date is required"),
  kategoria: z.string().min(1, "Category is required"), // reference
  semikategoria: z.string().or(z.null()).optional(), // reference
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;

