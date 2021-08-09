import { KafkaOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';

const options: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: { clientId: 'user', brokers: ['host.docker.internal:9094'] },
    consumer: { groupId: 'user' },
  },
};

export default options;
