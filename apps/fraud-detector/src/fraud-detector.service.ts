import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { Order } from './order.entity';

@Injectable()
export class FraudDetectorService implements OnModuleInit, OnModuleDestroy {
  producer: Producer;

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

  async checkFraud(order: Order) {
    if (this.isFraud(order)) {
      this.dispatchOrderRejected(order);
    } else {
      this.dispatchOrderApproved(order);
    }
  }

  private isFraud(order: Order): boolean {
    return order.amount >= 4500;
  }

  private async dispatchOrderRejected(order: Order): Promise<void> {
    await this.producer.send({
      topic: 'ECOMMERCE_ORDER_REJECTED',
      messages: [
        {
          key: order.email,
          value: order.toString(),
        },
      ],
      acks: 1,
      timeout: 500,
    });
  }

  private async dispatchOrderApproved(order: Order): Promise<void> {
    await this.producer.send({
      topic: 'ECOMMERCE_ORDER_APPROVED',
      messages: [
        {
          key: order.email,
          value: order.toString(),
        },
      ],
      acks: 1,
      timeout: 500,
    });
  }
}
