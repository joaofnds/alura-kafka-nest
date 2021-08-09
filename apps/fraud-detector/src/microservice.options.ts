import { KafkaOptions, Transport } from '@nestjs/microservices';

const options: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'fraud-detector',
      brokers: ['host.docker.internal:9094'],
    },
    consumer: { groupId: 'fraud-detector' },
  },
};

export default options;
