import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import microserviceOptions from './microservice.options';
import { ReadingReportModule } from './reading-report.module';

async function bootstrap() {
  const microsservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      ReadingReportModule,
      microserviceOptions,
    );

  microsservice.useGlobalPipes(new ValidationPipe({ transform: true }));

  await microsservice.listen();
}
bootstrap();
