import { ApplicationService } from '@adonisjs/core/types'
import { NestFactory } from '@nestjs/core'
import { ApolloServer } from '@apollo/server'
import { HttpContext } from '@adonisjs/core/http'
import { httpRequestHandler } from './http-request.handler.js'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default'
import { UserResolver } from '../main/resolvers/user.resolver.js'
import { GraphQLModule } from '@nestjs/graphql'
import { registerProviders } from './integrations/nestjs/ioc.bridge.js'
import { PostResolver } from '../main/resolvers/post.resolver.js'

export default class GraphqlProvider {
  constructor(protected app: ApplicationService) {}

  async boot() {
    // use register async for nest module to dont use dynamic import
    await registerProviders(this.app, [UserResolver, PostResolver])
    const { GraphqlModule } = await import('./integrations/nestjs/graphql.module.js')

    // todo: move nestjs to deps not devDeps
    const nestContext = await NestFactory.createApplicationContext(GraphqlModule)
    const gQlModule = nestContext.get(GraphQLModule)
    const builtSchema = (gQlModule as any).gqlSchemaHost.schema

    const apolloServer = new ApolloServer({
      // typeDefs: schema,
      schema: builtSchema,
      csrfPrevention: false,
      // resolvers: [userResolver],
      plugins: [
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageProductionDefault()
          : ApolloServerPluginLandingPageLocalDefault(),
      ],
    })

    const Route = await this.app.container.make('router')
    this.app.container.singleton(ApolloServer, async () => apolloServer)

    await apolloServer.start()

    Route.post('/graphql', (httpContext: HttpContext) =>
      httpRequestHandler(apolloServer, (ctx) => ctx, httpContext)
    )

    Route.get('/graphql', (httpContext: HttpContext) =>
      httpRequestHandler(apolloServer, (ctx) => ctx, httpContext)
    )
  }
}
