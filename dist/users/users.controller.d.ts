import { AuthService } from './auth.service';
import { CredentialsUserDto } from './dto/credentials-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    getSessionUser(user: string): string;
    createUser(body: CredentialsUserDto, session: any): Promise<import("./users.entity").User>;
    signin(body: CredentialsUserDto, session: any): Promise<import("./users.entity").User>;
    signout(session: any): Promise<string>;
    findUser(id: number): Promise<import("./users.entity").User>;
    findAllUsers(email: string): Promise<import("./users.entity").User[]>;
    deleteUser(id: string): Promise<import("./users.entity").User>;
    updateUser(id: string, body: UpdateUserDto): Promise<import("./users.entity").User>;
}
