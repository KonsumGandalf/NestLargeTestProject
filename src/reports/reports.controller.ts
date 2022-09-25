import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUserDecorator } from '../users/decorators/current-user.decorator';
import { User } from '../users/users.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { ReportsDto } from './dtos/report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportsDto)
  async createReport(
    @Body() body: CreateReportDto,
    @CurrentUserDecorator() currentUser: number,
  ) {
    return await this.reportsService.create(body, currentUser);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: number, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }

  @Get('')
  estimatePrice(@Query() query: GetEstimateDto){
    return this.reportsService.createEstimate(query);
  }
}
