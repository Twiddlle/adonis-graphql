import { DateTime } from 'luxon'
import { column, BaseModel, hasOne } from '@adonisjs/lucid/orm'
import User from './user.js'
import { type HasOne } from '@adonisjs/lucid/types/relations'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { gColumn } from '../../graphql/integrations/adonisjs/lucid.decorators.js'
import { makeGQLEnumType } from '../../graphql/graphql.utils.js'

export const PostStates = ['draft', 'published', 'deleted'] as const
export type PostState = (typeof PostStates)[number]
export const PostStateEnum = makeGQLEnumType(PostStates, { name: 'PostStates' })

@ObjectType()
export default class Post extends BaseModel {
  @gColumn({ isPrimary: true, gql: () => Int })
  id!: number

  @gColumn()
  content!: string

  @gColumn({ gql: () => Int })
  userId!: number

  @gColumn({ gql: () => PostStateEnum })
  state!: PostState

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
