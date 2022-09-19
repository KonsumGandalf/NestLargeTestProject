import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  Delete,
  Patch,
  Session,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsUserDto } from './dto/credentials-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUserDecorator } from './decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('whoami')
  getSessionUser(@CurrentUserDecorator() user: string) {
    return user;
  }

  @Post('/signup')
  async createUser(@Body() body: CredentialsUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CredentialsUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  async signout(@Session() session: any) {
    session.userId = null;
    return 'User signed out';
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(+id, body);
  }
}
