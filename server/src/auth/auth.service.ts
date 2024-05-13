import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { JwtPayload, Tokens } from './types';
import { SigninUserDto, SignupUserDto, UserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signupLocal(signupUserDto: SignupUserDto): Promise<Tokens> {
    const { email, password, role } = signupUserDto;
    const user = await this.prismaService.user
      .create({
        data: {
          email,
          password_hash: await bcrypt.hash(password, 10),
          role,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw error;
      });

    const tokens = await this.getTokens(user.user_id, user.email, user.role);
    await this.updateRefreshToken(user.user_id, tokens.refresh_token);

    return tokens;
  }

  async signinLocal(signinUserDto: SigninUserDto): Promise<Tokens> {
    const { email, password } = signinUserDto;

    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied: Invalid email');

    const validatePassword = await bcrypt.compare(password, user.password_hash);
    if (!validatePassword)
      throw new ForbiddenException('Access Denied: Invalid password');

    const tokens = await this.getTokens(user.user_id, user.email, user.role);
    await this.updateRefreshToken(user.user_id, tokens.refresh_token);

    return tokens;
  }

  async logout(user_id: string): Promise<boolean> {
    await this.prismaService.user.updateMany({
      where: {
        user_id: user_id,
        refresh_token: {
          not: null,
        },
      },
      data: {
        refresh_token: null,
      },
    });

    return true;
  }

  async refreshToken(user_id: string, refresh_token: string): Promise<Tokens> {
    const user = await this.prismaService.user.findUnique({
      where: {
        user_id: user_id,
      },
    });

    if (!user || !user.refresh_token)
      throw new ForbiddenException(
        'Access Denied: user not found or refresh token is null',
      );

    const validateToken = await bcrypt.compare(
      refresh_token,
      user.refresh_token,
    );

    if (!validateToken)
      throw new ForbiddenException('Access Denied: Invalid refresh token');

    const tokens = await this.getTokens(user.user_id, user.email, user.role);
    await this.updateRefreshToken(user.user_id, tokens.refresh_token);

    return tokens;
  }

  async updateRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<void> {
    await this.prismaService.user.update({
      where: { user_id: user_id },
      data: {
        refresh_token: await bcrypt.hash(refresh_token, 10),
      },
    });
  }

  async getTokens(user_id: string, email: string, role: Role): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      user_id: user_id,
      email: email,
      role: role,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.AT_JWT_SECRET,
        expiresIn: process.env.AT_JWT_EXPIRES_IN,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.RT_JWT_SECRET,
        expiresIn: process.env.RT_JWT_EXPIRES_IN,
      }),
    ]);

    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }

  async getUser(userId: string): Promise<UserDto> {
    const user = await this.prismaService.user.findUnique({
      where: { user_id: userId },
    });

    const { user_id, email, role } = user;
    return { user_id, email, role };
  }
}
