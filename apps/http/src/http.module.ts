import { KafkaModule } from '@app/kafka';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { CreateOrderService } from './create-order.service';
import microserviceOptions from './microservice.options';
import { OrderController } from './order.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVER',
        ...microserviceOptions,
      },
    ]),
    KafkaModule.register(microserviceOptions.options),
  ],
  controllers: [OrderController],
  providers: [CreateOrderService],
})
export class HttpModule {}
