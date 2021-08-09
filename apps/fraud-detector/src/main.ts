import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { FraudDetectorModule } from './fraud-detector.module';
import microserviceOptions from './microservice.options';

async function bootstrap() {
  const microsservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      FraudDetectorModule,
      microserviceOptions,
    );

  microsservice.useGlobalPipes(new ValidationPipe({ transform: true }));

  await microsservice.listen();
}
bootstrap();
