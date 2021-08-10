import { KafkaOptions, Transport } from '@nestjs/microservices';

const options: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'reading-report',
      brokers: ['host.docker.internal:9094'],
    },
    consumer: { groupId: 'reading-report' },
  },
};

export default options;
