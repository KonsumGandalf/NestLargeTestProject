import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUserDecorator = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    // never DataType since this decorator needs no data
    const req = ctx.switchToHttp().getRequest();
    console.log(req.session.userId);
    return req.session.userId;
  },
);
