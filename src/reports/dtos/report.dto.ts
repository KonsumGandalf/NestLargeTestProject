import { Expose, Transform } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/users.entity';

@Entity()
export class ReportsDto {
  @Expose()
  id: number;

  @Expose()
  approved: boolean;

  @Expose()
  price: number;

  @Expose()
  brand: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  miles: number;

  @Expose()
  lat: number;

  @Expose()
  lng: number;

  @Transform(({ obj }) => obj.user.name)
  @Expose()
  userId: number;


}
