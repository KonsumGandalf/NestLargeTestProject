import { ApproveReportDto } from './dtos/approve-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    createReport(body: CreateReportDto, currentUser: number): Promise<import("./entities/report.entity").ReportEntity>;
    approveReport(id: number, body: ApproveReportDto): Promise<import("./entities/report.entity").ReportEntity>;
    estimatePrice(query: GetEstimateDto): Promise<any[]>;
}
