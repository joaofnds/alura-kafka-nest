import { Body, Controller, Get, Inject, Logger, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateOrderDTO } from './create-order.dto';
import { CreateOrderService } from './create-order.service';

@Controller()
export class OrderController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    @Inject('KAFKA_SERVER')
    private readonly kafkaClient: ClientKafka,
  ) {}

  @Post()
  async createOrder(@Body() createOrderDTO: CreateOrderDTO): Promise<string> {
    this.createOrderService.createOrder(createOrderDTO);

    Logger.log('New order sent successfully');

    return 'New order sent';
  }

  @Get()
  async generateReadingReport(): Promise<void> {
    await lastValueFrom(
      this.kafkaClient.emit(
        'SEND_MESSAGE_TO_ALL_USERS',
        'USER_GENERATE_READING_REPORT',
      ),
    );
  }
}
