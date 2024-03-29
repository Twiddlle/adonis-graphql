import { z } from 'zod'

export const UserCreate = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    fullName: z.string().min(2),
  })
  .describe('UserCreate: Create user type')

export type UserCreateType = z.infer<typeof UserCreate>
