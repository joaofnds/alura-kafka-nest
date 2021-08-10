import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReadingReportService } from './reading-report.service';

@Controller()
export class ReadingReportController {
  constructor(private readonly readingReportService: ReadingReportService) {}

  @MessagePattern('USER_GENERATE_READING_REPORT')
  async getHello(@Payload('value') email: string): Promise<void> {
    this.readingReportService.genereteReportFor(email);
  }
}
