import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { FraudDetectorController } from './fraud-detector.controller';
import { FraudDetectorService } from './fraud-detector.service';
import microserviceOptions from './microservice.options';

@Module({
  imports: [
    ClientsModule.register([{ name: 'KAFKA_SERVER', ...microserviceOptions }]),
  ],
  controllers: [FraudDetectorController],
  providers: [FraudDetectorService],
})
export class FraudDetectorModule {}
