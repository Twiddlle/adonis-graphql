import { MutationWithZod } from 'nestjs-graphql-zod'
import { UserCreate } from '../schemas/user.schemas.js'
import type { UserCreateType } from '../schemas/user.schemas.js'
import { Query, Resolver } from '@nestjs/graphql'
import { inject } from '@adonisjs/core'
import { Database } from '@adonisjs/lucid/database'
import { Inject, Injectable, Scope } from '@nestjs/common'

@Resolver('User')
@inject()
@Injectable({ scope: Scope.REQUEST })
export class UserResolver {
  constructor(private readonly database: Database) {}

  @Query(() => String)
  sayHello(): string {
    console.log(typeof this.database)
    return 'Hello World from user resolver'
  }
  @MutationWithZod(UserCreate)
  createUser(userData: UserCreateType) {
    return userData
  }
}
