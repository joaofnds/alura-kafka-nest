import { Injectable } from '@nestjs/common';

@Injectable()
export class ReadingReportService {
  async generateReportFor(email: string): Promise<void> {
    console.log("pretending I'm generating a user report for " + email);
  }
}
