import { z } from 'zod'

export const PaginationScheme = z
  .object({
    page: z.number().optional().default(1),
    perPage: z.number().min(1).max(100).optional().default(20),
    sortBy: z.string().optional(),
    sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  })
  .describe('PaginationScheme: Pagination scheme')

export type PaginationType = z.infer<typeof PaginationScheme>

export const PaginationResponseScheme = z.object({
  meta: z.object({
    total: z.number(),
    perPage: z.number(),
    currentPage: z.number(),
    lastPage: z.number(),
  }),
})

export function makePaginationResponseScheme<T extends z.ZodType<any>>(scheme: T) {
  return PaginationResponseScheme.merge(z.object({ data: z.array(scheme) })).describe(
    `${scheme.description?.replace(/^([^:]+)(:.*)$/, '$1')}Paginated: ${scheme.constructor.name}`
  )
}
