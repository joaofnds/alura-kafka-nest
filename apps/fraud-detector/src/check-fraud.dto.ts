import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { Order } from './order.entity';

export class KafkaCheckFraudDTO {
  @Type(() => Order)
  @ValidateNested()
  @IsObject()
  value: Order;
}
