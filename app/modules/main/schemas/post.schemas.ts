import { z } from 'zod'

export const PostCreateSchema = z
  .object({
    userId: z.number().int().positive(),
    content: z.string().min(10),
  })
  .describe('PostCreate: Create post')

export type PostCreateType = z.infer<typeof PostCreateSchema>
