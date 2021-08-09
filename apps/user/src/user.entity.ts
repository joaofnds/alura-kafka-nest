import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}
