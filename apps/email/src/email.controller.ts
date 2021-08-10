import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('ECOMMERCE_SEND_EMAIL')
  async sendEmail(
    @Payload('key') recipient: string,
    @Payload('value') body: string,
  ): Promise<void> {
    await this.emailService.sendEmail(recipient, body);
  }
}
