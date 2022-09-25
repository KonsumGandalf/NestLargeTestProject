import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { ReportEntity } from './entities/report.entity';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity, User])],
  controllers: [ReportsController],
  providers: [ReportsService, UsersService],
})
export class ReportsModule {}
