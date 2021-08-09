import {
  Controller,
  Inject,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Client } from '@nestjs/microservices';
import { ClientKafka } from '@nestjs/microservices';
import {
  Consumer,
  Kafka,
} from '@nestjs/microservices/external/kafka.interface';
import { EachMessagePayload } from 'kafkajs';
import microserviceOptions from './microservice.options';

@Controller()
export class LogController implements OnModuleInit, OnModuleDestroy {
  @Client(microserviceOptions)
  private readonly kafkaClient: ClientKafka;
  consumer: Consumer;

  async onModuleInit() {
    const client = this.kafkaClient.createClient<Kafka>();
    this.consumer = client.consumer({ groupId: 'log-server' });
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: /ECOMMERCE.*/i });
    await this.consumer.run({ eachMessage: this.logRecord });
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
    await this.kafkaClient.close();
  }

  async logRecord({
    topic,
    partition,
    message,
  }: EachMessagePayload): Promise<void> {
    Logger.debug({
      topic,
      partition,
      key: message.key.toString(),
      value: message.value.toString(),
      headers: message.headers,
    });
  }
}
