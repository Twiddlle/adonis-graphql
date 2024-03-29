import { DateTime } from 'luxon'
import { column, BaseModel, hasOne } from '@adonisjs/lucid/orm'
import User from './user.js'
import { type HasOne } from '@adonisjs/lucid/types/relations'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  id!: number

  @column()
  title!: string

  @column()
  userId!: number

  @hasOne(() => User)
  author!: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  updatedAt!: DateTime
}
