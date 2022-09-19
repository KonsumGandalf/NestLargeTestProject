import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const user: User[] = await this.usersService.find(email);
    if (user.length) throw new BadRequestException('Email in use');

    // Generate Salt - 16 characters
    const salt = randomBytes(8).toString('hex');

    // Hash Salt & Password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    /*console.log('Hash: ', hash);*/
    // Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');
    /*console.log('Result: ', result);*/

    // Create a new user
    return await this.usersService.create(email, result);
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) throw new NotFoundException('no user was found');
    const [salt, storedHash] = user.password.split('.');

    /* console.log(
      'Back - Hash: ',
      storedHash,
      '\nBack - salt: ',
      salt,
      '\nBack - password:',
      user.password,
    );*/
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    /* console.log(
      'Back - Hash Encrypted: ',
      hash,
    );*/

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('wrong password');
    } else {
      return user;
    }
  }
}
