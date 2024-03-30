import { z } from 'zod'

export const UserCreateScheme = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    fullName: z.string().min(2),
  })
  .describe('UserCreateScheme: Create user scheme')

export type UserCreateType = z.infer<typeof UserCreateScheme>

export const UserResponseSchema = z
  .object({
    id: z.number(),
    email: z.string().email(),
  })
  .describe('User: User instance')
