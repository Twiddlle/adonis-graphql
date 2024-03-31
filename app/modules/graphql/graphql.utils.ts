import { registerEnumType } from '@nestjs/graphql'

export function createEnum(arr: any) {
  return (arr as any[]).reduce((acc, key) => {
    acc[key] = key
    return acc
  }, {})
}

type RegisterEnumOptions = Parameters<typeof registerEnumType>[1]
export function makeGQLEnumType(arr: any, options: RegisterEnumOptions) {
  const Enum = createEnum(arr)
  registerEnumType(Enum, options)
  return Enum
}
