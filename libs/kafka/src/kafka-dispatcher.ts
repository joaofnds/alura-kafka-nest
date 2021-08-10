import { OnModuleDestroy } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import {
  Logger,
  Producer,
  ProducerBatch,
  ProducerEvents,
  ProducerRecord,
  RecordMetadata,
  RemoveInstrumentationEventListener,
  Transaction,
  ValueOf,
} from 'kafkajs';
import { Kafka } from './kafka';

@Injectable()
export class KafkaDispatcher implements OnModuleInit, OnModuleDestroy {
  private readonly producer: Producer;

  constructor(kafka: Kafka) {
    this.producer = kafka.producer(kafka.config.producer);
  }

  onModuleInit() {
    this.producer.connect();
  }

  onModuleDestroy() {
    this.producer.disconnect();
  }

  send(topic: string, key: string, value: string) {
    this.producer.send({
      topic,
      messages: [{ key, value }],
      acks: 1,
      timeout: 500,
    });
  }
}
