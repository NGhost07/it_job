import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Tokens } from './types';
import { SigninUserDto, SignupUserDto, UserDto } from './dto';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUser, GetUserId, Public } from './decorators';
import { AccessTokenGuard, RefreshTokenGuard } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up' })
  @ApiOkResponse({ status: 200, description: 'Successfully register user!' })
  @ApiForbiddenResponse({ description: 'Credentials incorrect!' })
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(@Body() signupUserDto: SignupUserDto): Promise<Tokens> {
    return this.authService.signupLocal(signupUserDto);
  }

  @ApiOperation({ summary: 'Sign in' })
  @ApiOkResponse({ description: 'Successfully login!' })
  @ApiForbiddenResponse({ description: 'Credentials incorrect!' })
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async signinLocal(@Body() signinUserDto: SigninUserDto) {
    return this.authService.signinLocal(signinUserDto);
  }

  @ApiOperation({ summary: 'Logout' })
  @ApiOkResponse({ description: 'Successfully logout!' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized!' })
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@GetUserId() user_id: string): Promise<boolean> {
    return this.authService.logout(user_id);
  }

  @Public()
  @ApiOperation({ summary: 'Refresh Token' })
  @ApiOkResponse({ description: 'Successfully refresh token!' })
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ description: 'Unauthorized!' })
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refreshToken(
    @GetUserId() user_id: string,
    @GetUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshToken(user_id, refreshToken);
  }

  @ApiOperation({ summary: 'Get User' })
  @ApiOkResponse({ description: 'Successfully!' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized!' })
  @UseGuards(AccessTokenGuard)
  @Get('user')
  async getUset(@GetUserId() user_id: string): Promise<UserDto> {
    return this.authService.getUser(user_id);
  }
}
