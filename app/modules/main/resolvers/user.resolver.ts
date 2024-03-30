import { ZodArgs } from 'nestjs-graphql-zod'
import { UserCreateScheme } from '../schemas/user.schemas.js'
import type { UserCreateType } from '../schemas/user.schemas.js'
import { Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { inject } from '@adonisjs/core'
import { Database } from '@adonisjs/lucid/database'
import { PaginationScheme } from '../schemas/common.schemas.js'
import type { PaginationType } from '../schemas/common.schemas.js'
import User from '../models/user.js'
import { UserPaginated } from '../dtos/user.dto.js'
import Post from '../models/post.js'

@Resolver(() => User)
@inject()
export class UserResolver {
  constructor(private readonly database: Database) {}

  @Query(() => String)
  sayHello(): string {
    console.log(typeof this.database)
    return 'Hello World from user resolver'
  }

  @Query(() => UserPaginated)
  //todo: handle automatic prefix for each resolver class name
  async findUsers(@ZodArgs(PaginationScheme) paginationProps: PaginationType) {
    // todo: fix to not call serialize everytime
    return (await User.query().paginate(paginationProps.page, paginationProps.perPage)).serialize()
  }

  @Mutation(() => User)
  async createUser(@ZodArgs(UserCreateScheme) userData: UserCreateType) {
    return (await User.create(userData)).serialize()
  }

  @ResolveField(() => [Post])
  async posts(@Parent() user: User) {
    return Post.findManyBy({
      userId: user.id,
    })
  }
}
