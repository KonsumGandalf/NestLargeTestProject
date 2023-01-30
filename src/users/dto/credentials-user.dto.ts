import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CredentialsUserDto {
  @ApiProperty({
    description: 'The email of a user',

  })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
