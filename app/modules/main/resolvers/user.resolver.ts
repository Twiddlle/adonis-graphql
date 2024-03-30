import { MutationWithZod, QueryWithZod, ZodArgs } from 'nestjs-graphql-zod'
import { UserCreateScheme, UserResponseSchema } from '../schemas/user.schemas.js'
import type { UserCreateType } from '../schemas/user.schemas.js'
import { Query, Resolver } from '@nestjs/graphql'
import { inject } from '@adonisjs/core'
import { Database } from '@adonisjs/lucid/database'
import { makePaginationResponseScheme, PaginationScheme } from '../schemas/common.schemas.js'
import type { PaginationType } from '../schemas/common.schemas.js'
import User from '../modes/user.js'

@Resolver('User')
@inject()
export class UserResolver {
  constructor(private readonly database: Database) {}

  @Query(() => String)
  sayHello(): string {
    console.log(typeof this.database)
    return 'Hello World from user resolver'
  }

  @QueryWithZod(makePaginationResponseScheme(UserResponseSchema))
  //todo: handle automatic prefix for each resolver class name
  async findUsers(@ZodArgs(PaginationScheme) paginationProps: PaginationType) {
    // todo: fix to not call serialize everytime
    return (await User.query().paginate(paginationProps.page, paginationProps.perPage)).serialize()
  }

  @MutationWithZod(UserResponseSchema)
  async createUser(@ZodArgs(UserCreateScheme) userData: UserCreateType) {
    return (await User.create(userData)).serialize()
  }
}
