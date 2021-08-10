import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Kafka } from '@nestjs/microservices/external/kafka.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Producer } from 'kafkajs';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService implements OnModuleInit, OnModuleDestroy {
  producer: Producer;

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject('KAFKA_SERVER')
    private readonly kafkaClient: ClientKafka,
  ) {}

  onModuleInit() {
    const client = this.kafkaClient.createClient<Kafka>();
    this.producer = client.producer();
    this.producer.connect();
  }

  onModuleDestroy() {
    this.producer.disconnect();
  }

  async createUserIfNotExists(user: User): Promise<User> {
    try {
      const existingUser = await this.usersRepository.findOneOrFail({
        email: user.email,
      });

      Logger.log('user already exists: ' + user.email);

      return existingUser;
    } catch (error) {
      await this.usersRepository.insert({ email: user.email });

      Logger.log('created user: ' + user.email);

      return new User(user.email);
    }
  }

  async sendMessageToAllUsers(message: string): Promise<void> {
    const email$ = await this.usersRepository
      .createQueryBuilder('user')
      .select('email')
      .stream();

    email$.on('data', ({ email }: { email: string }) =>
      this.producer.send({
        topic: message,
        messages: [{ key: email, value: email }],
        acks: 1,
        timeout: 500,
      }),
    );
  }
}
