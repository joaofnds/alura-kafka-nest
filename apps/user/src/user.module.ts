import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import microserviceConfig from './microservice.config';
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
    ClientsModule.register([{ name: 'KAFKA_SERVER', ...microserviceConfig }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
