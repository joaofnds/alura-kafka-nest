import { KafkaOptions } from '@nestjs/microservices';
import { Kafka as KafkaJS } from 'kafkajs';

export type KafkaConfig = KafkaOptions['options'];

export class Kafka extends KafkaJS {
  readonly config: KafkaConfig;
  constructor(config: KafkaConfig) {
    super(config.client);
    this.config = config;
  }
}
