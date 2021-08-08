import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { CreateOrderDTO } from './create-order.dto';

@Injectable()
export class CreateOrderService implements OnModuleInit, OnModuleDestroy {
  private producer: Producer;

  constructor(
    @Inject('KAFKA_SERVER')
    private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.producer = await this.kafkaClient.connect();
  }

  async onModuleDestroy() {
    await this.kafkaClient.close();
  }

  async createOrder(createOrderDTO: CreateOrderDTO) {
    this.dispatchOrder(createOrderDTO);
    this.dispatchEmail(createOrderDTO.email);
  }

  private async dispatchOrder(createOrderDTO: CreateOrderDTO): Promise<void> {
    await this.producer.send({
      topic: 'ECOMMERCE_NEW_ORDER',
      messages: [
        {
          key: createOrderDTO.email,
          value: createOrderDTO.toString(),
        },
      ],
      acks: 1,
      timeout: 500,
    });
  }

  private async dispatchEmail(receiverEmail: string): Promise<void> {
    await this.producer.send({
      topic: 'ECOMMERCE_SEND_EMAIL',
      messages: [
        {
          key: receiverEmail,
          value: 'Thank you for your order! We are processing your order!',
        },
      ],
      acks: 1,
      timeout: 500,
    });
  }
}
