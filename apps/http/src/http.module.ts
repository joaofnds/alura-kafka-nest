import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CreateOrderService } from './create-order.service';
import { OrderController } from './order.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVER',
        transport: Transport.KAFKA,
        options: {
          client: { clientId: 'http', brokers: ['host.docker.internal:9094'] },
          consumer: { groupId: 'http' },
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [CreateOrderService],
})
export class HttpModule {}
