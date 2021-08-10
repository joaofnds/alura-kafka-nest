import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KafkaDispatcher } from '@app/kafka';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly dispatcher: KafkaDispatcher,
  ) {}

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
      this.dispatcher.send(message, email, email),
    );
  }
}
