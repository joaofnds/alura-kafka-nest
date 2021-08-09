import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FraudDetectorController } from './fraud-detector.controller';
import { FraudDetectorService } from './fraud-detector.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVER',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'fraud-detector',
            brokers: ['localhost:9094'],
          },
          consumer: {
            groupId: 'fraud-detector',
          },
        },
      },
    ]),
  ],
  controllers: [FraudDetectorController],
  providers: [FraudDetectorService],
})
export class FraudDetectorModule {}
