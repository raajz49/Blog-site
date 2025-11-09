import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters")
    .trim()
    .nonempty("Title is required"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .trim()
    .nonempty("Content is required"),
});

export type PostFormData = z.infer<typeof postSchema>;
