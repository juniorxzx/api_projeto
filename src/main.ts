import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API PROJETO')
    .setDescription('Projeto Integrador')
    .setContact('Grupo 2 - Generation Brasil',
      'link',
      'email')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app,
    config)

  SwaggerModule.setup('/swagger', app, document)

  process.env.TZ = '-03:00'
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  await app.listen(3000);
}
bootstrap();
