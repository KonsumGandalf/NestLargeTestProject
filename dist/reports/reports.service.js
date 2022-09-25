"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const report_entity_1 = require("./entities/report.entity");
let ReportsService = class ReportsService {
    constructor(repo, usersService) {
        this.repo = repo;
        this.usersService = usersService;
    }
    async create(reportDto, currentUser) {
        const report = this.repo.create(reportDto);
        report.user = await this.usersService.findOne(currentUser);
        return await this.repo.save(report);
    }
    async changeApproval(id, approvedStatus) {
        const report = await this.repo.findOneBy({ id: id });
        if (!report) {
            throw new common_1.NotFoundException('report not found');
        }
        report.approved = approvedStatus;
        return this.repo.save(report);
    }
    async createEstimate({ brand, model, lat, lng, year, miles, }) {
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
};
ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(report_entity_1.ReportEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], ReportsService);
exports.ReportsService = ReportsService;
//# sourceMappingURL=reports.service.js.map