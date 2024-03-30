import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'

import Post from './post.js'
import { type HasMany } from '@adonisjs/lucid/types/relations'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export default class User extends BaseModel {
  @Field()
  @column({ isPrimary: true })
  id!: number

  @column()
  @Field(() => String, { nullable: true })
  fullName!: string | null

  @column()
  @Field()
  email!: string

  @Field(() => [Post])
  @hasMany(() => Post)
  posts!: HasMany<typeof Post>

  @column()
  password!: string

  @column.dateTime({ autoCreate: true })
  createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  updatedAt!: DateTime
}
