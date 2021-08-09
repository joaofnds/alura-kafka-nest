import { KafkaOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';

const options: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: { clientId: 'email', brokers: ['host.docker.internal:9094'] },
    consumer: { groupId: 'email' },
  },
};

export default options;
