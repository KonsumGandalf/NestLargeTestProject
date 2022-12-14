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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const credentials_user_dto_1 = require("./dto/credentials-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_dto_1 = require("./dto/user.dto");
const users_service_1 = require("./users.service");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
const current_user_decorator_1 = require("./decorators/current-user.decorator");
const auth_guard_1 = require("../guards/auth.guard");
let UsersController = class UsersController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    async getSessionUser(user) {
        return await this.findUser(user);
    }
    async createUser(body, session) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }
    async signin(body, session) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }
    async signout(session) {
        session.userId = null;
        return 'User signed out';
    }
    async findUser(id) {
        return await this.usersService.findOne(+id);
    }
    findAllUsers(email) {
        return this.usersService.find(email);
    }
    deleteUser(id) {
        return this.usersService.remove(+id);
    }
    updateUser(id, body) {
        return this.usersService.update(+id, body);
    }
};
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('whoami'),
    __param(0, (0, current_user_decorator_1.CurrentUserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getSessionUser", null);
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [credentials_user_dto_1.CredentialsUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('/signin'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [credentials_user_dto_1.CredentialsUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signin", null);
__decorate([
    (0, common_1.Post)('/signout'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signout", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findUser", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAllUsers", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUser", null);
UsersController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, serialize_interceptor_1.Serialize)(user_dto_1.UserDto),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map