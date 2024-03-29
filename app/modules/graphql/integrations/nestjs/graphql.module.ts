import { Module, Type } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'node:path'
import { getRegisteredProviders } from './ioc.bridge.js'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'app/modules/graphql/schema.gql'),
      transformAutoSchemaFile: true,
      transformSchema: (schema) => {
        return schema
      },
    }),
  ],
  //todo: automatically load resolvers from filesystem
  providers: [...getRegisteredProviders()],
})
export class GraphqlModule {}
