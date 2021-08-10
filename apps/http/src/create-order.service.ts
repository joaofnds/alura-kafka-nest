import { KafkaDispatcher } from '@app/kafka';
import { Injectable } from '@nestjs/common';
import { CreateOrderDTO } from './create-order.dto';

@Injectable()
export class CreateOrderService {
  constructor(private readonly dispatcher: KafkaDispatcher) {}

  async createOrder(createOrderDTO: CreateOrderDTO) {
    this.dispatchOrder(createOrderDTO);
    this.dispatchEmail(createOrderDTO.email);
  }

  private async dispatchOrder(createOrderDTO: CreateOrderDTO): Promise<void> {
    await this.dispatcher.send(
      'ECOMMERCE_NEW_ORDER',
      createOrderDTO.email,
      createOrderDTO.toString(),
    );
  }

  private async dispatchEmail(receiverEmail: string): Promise<void> {
    await this.dispatcher.send(
      'ECOMMERCE_SEND_EMAIL',
      receiverEmail,
      'Thank you for your order! We are processing your order!',
    );
  }
}
