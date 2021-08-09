import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { LogModule } from './log.module';

async function bootstrap() {
  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(LogModule);

  microservice.useGlobalPipes(new ValidationPipe({ transform: true }));

  await microservice.listen();
}
bootstrap();
