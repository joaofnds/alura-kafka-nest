import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CreateOrderDTO } from './create-order.dto';
import { CreateOrderService } from './create-order.service';

@Controller()
export class OrderController {
  constructor(private readonly createOrderService: CreateOrderService) {}

  @Post()
  async getHello(@Body() createOrderDTO: CreateOrderDTO): Promise<string> {
    this.createOrderService.createOrder(createOrderDTO);

    Logger.log('New order sent successfully');

    return 'New order sent';
  }
}
