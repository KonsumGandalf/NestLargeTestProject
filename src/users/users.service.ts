import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(email: string, password: string) {
    const user = await this.repo.create({ email, password });
    return this.repo.save(user);
  }

  async findOne(id: number) {
    if (!id) throw new NotFoundException('user not found with id: ' + id);
    const user = await this.repo.findOneBy({ id: id });
    if (!user) throw new NotFoundException('user not found with id: ' + id);
    return user;
  }

  async find(email: string) {
    return await this.repo.find({ where: { email: email } });
  }

  async update(id: number, attrs: Partial<User>) {
    let user = await this.findOne(id);
    user = Object.assign(user, attrs);
    console.log(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.repo.remove(user);
  }
}
