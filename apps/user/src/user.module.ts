import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaModule } from 'libs/kafka/src';
import kafkaConfig from './microservice.config';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'users',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    KafkaModule.register(kafkaConfig.options),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
