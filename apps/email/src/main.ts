import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { EmailModule } from './email.module';
import microserviceConfig from './microservice.config';

async function bootstrap() {
  const microsservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      EmailModule,
      microserviceConfig,
    );

  microsservice.useGlobalPipes(new ValidationPipe({ transform: true }));

  await microsservice.listen();
}
bootstrap();
