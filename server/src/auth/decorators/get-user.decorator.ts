import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtPayloadWithRT } from '../types';

export const GetUser = createParamDecorator(
  (data: keyof JwtPayloadWithRT | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
