import { z } from 'zod'

export const PostCreate = z
  .object({
    userId: z.string(),
    content: z.string().min(10),
  })
  .describe('PostCreate: Create post')

export type PostCreateType = z.infer<typeof PostCreate>
