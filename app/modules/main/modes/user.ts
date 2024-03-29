import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'

import Post from './post.js'
import { type HasMany } from '@adonisjs/lucid/types/relations'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  id!: number

  @column()
  fullName!: string | null

  @column()
  email!: string

  @hasMany(() => Post)
  posts!: HasMany<typeof Post>

  @column()
  password!: string

  @column.dateTime({ autoCreate: true })
  createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  updatedAt!: DateTime
}
