/// <reference types="node" />
import { User } from './users.entity';
import { UsersService } from './users.service';
export declare const scrypt: (arg1: import("crypto").BinaryLike, arg2: import("crypto").BinaryLike, arg3: number) => Promise<unknown>;
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    signup(email: string, password: string): Promise<User>;
    signin(email: string, password: string): Promise<User>;
}
