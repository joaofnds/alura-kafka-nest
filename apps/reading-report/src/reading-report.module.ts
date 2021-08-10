import { Module } from '@nestjs/common';
import { ReadingReportController } from './reading-report.controller';
import { ReadingReportService } from './reading-report.service';

@Module({
  imports: [],
  controllers: [ReadingReportController],
  providers: [ReadingReportService],
})
export class ReadingReportModule {}
