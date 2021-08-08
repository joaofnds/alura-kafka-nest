import { classToPlain } from 'class-transformer';
import { IsCurrency, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  email: string;

  @IsCurrency()
  amount: number;

  toPlain(): object {
    return classToPlain(this);
  }

  toString(): string {
    return JSON.stringify(this.toPlain());
  }
}
