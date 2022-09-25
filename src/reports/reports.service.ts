import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { ReportEntity } from './entities/report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ReportEntity)
    private repo: Repository<ReportEntity>,
    private readonly usersService: UsersService,
  ) {}

  async create(reportDto: CreateReportDto, currentUser: number) {
    const report = this.repo.create(reportDto);
    report.user = await this.usersService.findOne(currentUser);
    return await this.repo.save(report);
  }

  async changeApproval(id: number, approvedStatus: boolean) {
    const report = await this.repo.findOneBy({ id: id });
    if (!report) {
      throw new NotFoundException('report not found');
    }
    report.approved = approvedStatus;
    return this.repo.save(report);
  }

  async createEstimate({
    brand,
    model,
    lat,
    lng,
    year,
    miles,
  }: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('brand = :brand', { brand: brand })
      .andWhere('model = :model', { model: model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year: year })
      .andWhere('approved - :approved', { approved: true })
      .orderBy('ABS(miles -:miles)', 'DESC')
      .setParameters({ miles: miles })
      .take(3)
      .getRawMany();
  }
}
