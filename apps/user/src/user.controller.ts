import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OrderDTO } from './order.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @EventPattern('ECOMMERCE_NEW_ORDER')
  async createUser(@Payload('value') order: OrderDTO): Promise<void> {
    const user = new User(order.email);
    this.userService.createUserIfNotExists(user);
  }

  @EventPattern('ECOMMERCE_SEND_MESSAGE_TO_ALL_USERS')
  async sendMessageToAllUsers(
    @Payload('value') message: string,
  ): Promise<void> {
    this.userService.sendMessageToAllUsers(message);
  }
}
