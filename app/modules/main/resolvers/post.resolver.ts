import { ZodArgs } from 'nestjs-graphql-zod'
import { Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { PostCreateSchema } from '../schemas/post.schemas.js'
import type { PostCreateType } from '../schemas/post.schemas.js'
import Post from '../models/post.js'
import { PostPaginated } from '../dtos/post.dto.js'
import { PaginationScheme, type PaginationType } from '../schemas/common.schemas.js'
import User from '../models/user.js'

@Resolver(() => Post)
export class PostResolver {
  @Mutation(() => Post)
  async createPost(@ZodArgs(PostCreateSchema) postData: PostCreateType) {
    return (await Post.create(postData)).serialize()
  }

  @Query(() => PostPaginated)
  async findPosts(@ZodArgs(PaginationScheme) paginationProps: PaginationType) {
    return (await Post.query().paginate(paginationProps.page, paginationProps.perPage)).serialize()
  }

  @ResolveField(() => [Post])
  async author(@Parent() post: Post) {
    return User.findOrFail(post.userId)
  }
}
