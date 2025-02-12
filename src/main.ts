import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { DuplicateEntyFilter } from './common/filters/duplicate-entry.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Admin Portal API')
    .setDescription(
      'This doc is the open api specification doc for admin portal api',
    )
    .setVersion('1.0')
    .addTag('admin-portal-api')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new DuplicateEntyFilter());

  await app.listen(process.env.API_PORT ?? 8000);
}
bootstrap();
