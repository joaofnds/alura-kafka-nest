import { classToPlain } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class OrderDTO {
  @IsEmail()
  email: string;

  toPlain(): Record<string, unknown> {
    return classToPlain(this);
  }

  toString(): string {
    return JSON.stringify(this.toPlain());
  }
}
