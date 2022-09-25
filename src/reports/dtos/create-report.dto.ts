import { Expose } from 'class-transformer';
import {
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { GetEstimateDto } from './get-estimate.dto';

export class CreateReportDto extends GetEstimateDto {
  @IsNumber()
  @Min(0)
  @Max(100000)
  price: number;
}
