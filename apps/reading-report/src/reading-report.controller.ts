import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ReadingReportService } from './reading-report.service';

@Controller()
export class ReadingReportController {
  constructor(private readonly readingReportService: ReadingReportService) {}

  @EventPattern('USER_GENERATE_READING_REPORT')
  async getHello(@Payload('value') email: string): Promise<void> {
    this.readingReportService.generateReportFor(email);
  }
}
