import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { ReportEntity } from './entities/report.entity';
export declare class ReportsService {
    private repo;
    private readonly usersService;
    constructor(repo: Repository<ReportEntity>, usersService: UsersService);
    create(reportDto: CreateReportDto, currentUser: number): Promise<ReportEntity>;
    changeApproval(id: number, approvedStatus: boolean): Promise<ReportEntity>;
    createEstimate({ brand, model, lat, lng, year, miles, }: GetEstimateDto): Promise<any[]>;
}
