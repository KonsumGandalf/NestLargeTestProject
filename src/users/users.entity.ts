import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export interface IUser {
  email: string;
  password: string;
}

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted the User', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated the User', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed the User', this.id);
  }
}
