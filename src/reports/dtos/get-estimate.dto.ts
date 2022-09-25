import { Expose } from 'class-transformer';
import {
  IsNumber,
  IsString,
  Min,
  Max,
  IsLongitude,
  IsLatitude, IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class GetEstimateDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(1930)
  @Max(2022)
  year: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(0)
  @Max(100000)
  miles: number;

  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;
}
