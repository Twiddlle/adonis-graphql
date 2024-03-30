import { MutationWithZod, ZodArgs } from 'nestjs-graphql-zod'
import { Resolver } from '@nestjs/graphql'
import { PostCreateSchema, PostResponseSchema } from '../schemas/post.schemas.js'
import type { PostCreateType } from '../schemas/post.schemas.js'
import Post from '../models/post.js'

@Resolver('Post')
export class PostResolver {
  @MutationWithZod(PostResponseSchema)
  async createPost(@ZodArgs(PostCreateSchema) postData: PostCreateType) {
    return (await Post.create(postData)).serialize()
  }
}
