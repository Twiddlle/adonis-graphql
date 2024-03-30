import { DateTime } from 'luxon'
import { column, BaseModel, hasOne } from '@adonisjs/lucid/orm'
import User from './user.js'
import { type HasOne } from '@adonisjs/lucid/types/relations'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export default class Post extends BaseModel {
  @Field(() => Int)
  @column({ isPrimary: true })
  id!: number

  @Field()
  @column()
  content!: string

  @Field()
  @column()
  userId!: number

  @Field(() => User)
  @hasOne(() => User)
  author!: HasOne<typeof User>

  @Field(() => String)
  @column.dateTime({ autoCreate: true })
  createdAt!: DateTime

  @Field(() => String)
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  updatedAt!: DateTime
}
