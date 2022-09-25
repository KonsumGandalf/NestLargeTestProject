import { ReportEntity } from '../reports/entities/report.entity';
export interface IUser {
    email: string;
    password: string;
}
export declare class User implements IUser {
    id: number;
    admin: boolean;
    email: string;
    password: string;
    reports: ReportEntity[];
    logInsert(): void;
    logUpdate(): void;
    logRemove(): void;
}
