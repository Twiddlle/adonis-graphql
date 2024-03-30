import { paginatedType } from './paginated-response.dto.js'
import { ObjectType } from '@nestjs/graphql'
import Post from '../models/post.js'

@ObjectType()
export class PostPaginated extends paginatedType(Post) {}
