import { z } from 'zod'

export const PostCreateSchema = z
  .object({
    userId: z.number().int().positive(),
    content: z.string().min(10),
  })
  .describe('PostCreate: Create post')

export type PostCreateType = z.infer<typeof PostCreateSchema>

export const PostResponseSchema = z
  .object({
    id: z.number(),
    content: z.string(),
    userId: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .describe('Post: Post instance')
export type PostResponseType = z.infer<typeof PostResponseSchema>
