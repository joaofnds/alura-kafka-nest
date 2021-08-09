import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
}
