import { paginatedType } from './paginated-response.dto.js'
import User from '../models/user.js'
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserPaginated extends paginatedType(User) {}
