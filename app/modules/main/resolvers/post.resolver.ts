import { MutationWithZod } from 'nestjs-graphql-zod'
import { Resolver } from '@nestjs/graphql'
import { PostCreate } from '../schemas/post.schemas.js'
import type { PostCreateType } from '../schemas/post.schemas.js'

@Resolver('Post')
export class PostResolver {
  @MutationWithZod(PostCreate)
  createPost(postData: PostCreateType) {
    return postData
  }
}
