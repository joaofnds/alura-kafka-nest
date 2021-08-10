import { DynamicModule, Module } from '@nestjs/common';
import { Kafka, KafkaConfig } from './kafka';
import { KafkaDispatcher } from './kafka-dispatcher';

@Module({})
export class KafkaModule {
  static register(config: KafkaConfig): DynamicModule {
    return {
      module: KafkaModule,
      providers: [
        { provide: Kafka, useFactory: () => new Kafka(config) },
        KafkaDispatcher,
      ],
      exports: [KafkaDispatcher],
    };
  }
}
