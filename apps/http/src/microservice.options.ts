import { KafkaOptions, Transport } from '@nestjs/microservices';

const options: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: { clientId: 'http', brokers: ['host.docker.internal:9094'] },
    consumer: { groupId: 'http' },
  },
};

export default options;
