import { classToPlain } from 'class-transformer';
import { IsCurrency, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class Order {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  email: string;

  @IsCurrency()
  amount: number;

  toPlain(): Record<string, unknown> {
    return classToPlain(this);
  }

  toString(): string {
    return JSON.stringify(this.toPlain());
  }
}
