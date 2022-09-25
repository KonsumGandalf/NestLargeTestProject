import { Injectable, NestMiddleware, NestModule } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { User } from '../users.entity';
import { UsersService } from '../users.service';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    if (userId) {
      console.log(userId);
      const user = await this.usersService.findOne(userId);
      req.currentUser = user;
    }

    next();
  }
}
