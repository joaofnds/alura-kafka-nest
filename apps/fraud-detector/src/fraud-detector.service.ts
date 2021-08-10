import { KafkaDispatcher } from '@app/kafka';
import { Injectable } from '@nestjs/common';
import { Order } from './order.entity';

@Injectable()
export class FraudDetectorService {
  constructor(private readonly dispatcher: KafkaDispatcher) {}

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
    await this.dispatcher.send(
      'ECOMMERCE_ORDER_REJECTED',
      order.email,
      order.toString(),
    );
  }

  private async dispatchOrderApproved(order: Order): Promise<void> {
    await this.dispatcher.send(
      'ECOMMERCE_ORDER_APPROVED',
      order.email,
      order.toString(),
    );
  }
}
