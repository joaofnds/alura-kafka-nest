import { Inject } from '@nestjs/common';
import { OnModuleDestroy } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject('KAFKA_SERVER')
    private readonly kafkaClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.kafkaClient.connect();
  }

  onModuleDestroy() {
    this.kafkaClient.close();
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
      this.kafkaClient.emit(message, email),
    );
  }
}
