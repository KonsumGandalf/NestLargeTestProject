import { IsArray, IsString, IsUrl } from 'class-validator';

export class googleRequestDto {
  @IsUrl()
  url: string;

  @IsString()
  key: string;

  @IsString()
  category: string;
}
