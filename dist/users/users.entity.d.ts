export interface IUser {
    email: string;
    password: string;
}
export declare class User implements IUser {
    id: number;
    email: string;
    password: string;
    logInsert(): void;
    logUpdate(): void;
    logRemove(): void;
}
