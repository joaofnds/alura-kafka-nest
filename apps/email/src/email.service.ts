import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  sendEmail(recipient: string, body: string): Promise<void> {
    return new Promise((resolve) => {
      Logger.log("pretending I'm sending an email");
      Logger.log('to: ' + recipient);
      Logger.log('body: ' + body);

      setTimeout(() => resolve(), 1000);
    });
  }
}
