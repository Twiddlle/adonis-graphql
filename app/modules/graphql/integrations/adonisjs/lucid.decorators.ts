import { applyDecorators } from '@nestjs/common'
import { column } from '@adonisjs/lucid/orm'
import { Field } from '@nestjs/graphql'

export type FieldType = Parameters<typeof Field>[0]
export type ColumnType = Parameters<typeof column>[0] & { gql?: FieldType }

export function gColumn(args?: ColumnType) {
  return applyDecorators(column(args), Field(args?.gql))
}
