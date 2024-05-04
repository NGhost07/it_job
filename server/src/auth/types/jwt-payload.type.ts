import { Role } from '@prisma/client';

export type JwtPayload = {
  user_id: string;
  email: string;
  role: Role;
};
