import { Expose } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto{
  @IsEmail()
  @IsOptional()
  @Expose()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
