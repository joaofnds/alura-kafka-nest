import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FraudDetectorModule } from './fraud-detector.module';

async function bootstrap() {
  const microsservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      FraudDetectorModule,
      {
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9094'],
          },
        },
      },
    );

  microsservice.useGlobalPipes(new ValidationPipe({ transform: true }));

  await microsservice.listen();
}
bootstrap();
