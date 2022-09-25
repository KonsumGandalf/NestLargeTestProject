import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ReportEntity } from '../reports/entities/report.entity';

export interface IUser {
  email: string;
  password: string;
}

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  admin: boolean;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => ReportEntity, (report) => report.user)
  reports: ReportEntity[];

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
