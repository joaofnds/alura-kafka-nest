import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaCheckFraudDTO } from './kafka-check-fraud.dto';
import { FraudDetectorService } from './fraud-detector.service';

@Controller()
export class FraudDetectorController {
  constructor(private readonly fraudDetectorService: FraudDetectorService) {}

  @MessagePattern('ECOMMERCE_NEW_ORDER')
  getHello(
    @Payload()
    createParcelDto: KafkaCheckFraudDTO,
  ): void {
    this.fraudDetectorService.checkFraud(createParcelDto.value);
  }
}
