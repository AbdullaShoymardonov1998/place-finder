import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.enableVersioning()

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Place Finder')
    .setDescription('Place Finder application for locals and tourists')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(4000)
}
bootstrap()
