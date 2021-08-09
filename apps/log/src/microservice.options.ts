import { KafkaOptions, Transport } from '@nestjs/microservices';

const options: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'log',
      brokers: ['host.docker.internal:9094'],
    },
    consumer: { groupId: 'log' },
  },
};

export default options;
