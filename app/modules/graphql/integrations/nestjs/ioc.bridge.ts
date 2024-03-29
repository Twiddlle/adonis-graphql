import { ApplicationService } from '@adonisjs/core/types'
import { Provider } from '@nestjs/common'

const registeredProviders: Provider[] = []

export async function registerProvider(registerFn: () => Promise<any>) {
  const provider = await registerFn()
  registeredProviders.push({
    provide: provider.constructor.name,
    useValue: provider,
  })
  return provider
}

export async function registerProviders(app: ApplicationService, providers: Array<any>) {
  return await Promise.all(
    providers.map((provider) => {
      return registerProvider(() => app.container.make(provider))
    })
  )
}

export function getRegisteredProviders() {
  return registeredProviders
}
