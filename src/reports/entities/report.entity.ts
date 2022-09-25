import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/users.entity';

@Entity()
export class ReportEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  approved: boolean;

  @Column()
  price: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  miles: number;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
