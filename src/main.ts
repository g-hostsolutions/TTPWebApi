import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

process.on('uncaughtException', (err) => {
  Logger.warn(err, 'LOGGER', false)
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.useGlobalPipes(new ValidationPipe({ validateCustomDecorators: true }))
  await app.listen(process.env.PORT || '8000')
}
bootstrap()
