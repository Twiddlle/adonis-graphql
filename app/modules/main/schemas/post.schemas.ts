import { z } from 'zod'
import { PostStates } from '../models/post.js'

export const PostCreateSchema = z
  .object({
    userId: z.number().int().positive(),
    content: z.string().min(10),
    state: z.enum(PostStates),
  })
  .describe('PostCreate: Create post')

export type PostCreateType = z.infer<typeof PostCreateSchema>
