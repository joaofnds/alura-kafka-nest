import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import microserviceConfig from './microservice.config';
import { UserModule } from './user.module';

async function bootstrap() {
  const microsservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      UserModule,
      microserviceConfig,
    );

  microsservice.useGlobalPipes(new ValidationPipe({ transform: true }));

  await microsservice.listen();
}
bootstrap();
