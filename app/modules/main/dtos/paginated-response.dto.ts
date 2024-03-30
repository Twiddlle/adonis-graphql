import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Type } from '@nestjs/common'

@ObjectType()
export class PaginatedResponseMetaDto {
  @Field(() => Int)
  declare total: number

  @Field(() => Int)
  declare page: number

  @Field(() => Int)
  declare perPage: number

  @Field(() => Int)
  declare lastPage: number

  @Field(() => Int)
  declare currentPage: number
}

@ObjectType({ isAbstract: true })
export class PaginatedResponseDto {
  @Field(() => PaginatedResponseMetaDto)
  declare meta: PaginatedResponseMetaDto
}

export function paginatedType<T extends Type>(classRef: T) {
  @ObjectType(`${classRef.name}Paginated`, { isAbstract: true })
  abstract class PaginatedResponseDtoTyped extends PaginatedResponseDto {
    // @ts-ignore
    @Field(() => [classRef])
    declare data: InstanceType<T>[]
  }
  return PaginatedResponseDtoTyped
}
