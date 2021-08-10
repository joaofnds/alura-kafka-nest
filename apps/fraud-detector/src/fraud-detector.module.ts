import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { KafkaModule } from '@app/kafka';
import { FraudDetectorController } from './fraud-detector.controller';
import { FraudDetectorService } from './fraud-detector.service';
import microserviceOptions from './microservice.options';

@Module({
  imports: [
    ClientsModule.register([{ name: 'KAFKA_SERVER', ...microserviceOptions }]),
    KafkaModule.register(microserviceOptions.options),
  ],
  controllers: [FraudDetectorController],
  providers: [FraudDetectorService],
})
export class FraudDetectorModule {}
