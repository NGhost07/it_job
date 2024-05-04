import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Role, UserProfile } from '@prisma/client';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserProfileDto, UpdateUserProfileDto } from './dto';
import { AccessTokenGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators';
import { UserProfileService } from './user-profile.service';

@ApiTags('User Profiles')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized: Login first!' })
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @ApiOperation({ summary: 'Create new Profile for user' })
  @ApiCreatedResponse({ description: 'Created' })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: CreateUserProfileDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Invalid user profile' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Post()
  async create(
    @Body() createUserProfileDto: CreateUserProfileDto,
  ): Promise<UserProfile> {
    return this.userProfileService.create(createUserProfileDto);
  }

  @ApiOperation({ summary: 'Get all user profile' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiForbiddenResponse({ description: 'Forbidden: Requires admin rights' })
  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async findAll(): Promise<UserProfile[]> {
    return this.userProfileService.findAll();
  }

  @ApiOperation({ summary: 'Get user profile by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid user profile id' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<UserProfile> {
    return this.userProfileService.findOneById(id);
  }

  @ApiOperation({ summary: 'Get user profile by user id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid user id' })
  @Get('user/:userId')
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  async findOneByUserId(
    @Param('user_id') user_id: string,
  ): Promise<UserProfile> {
    return this.userProfileService.findOneByUserId(user_id);
  }

  @ApiOperation({ summary: 'Update user profile by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid id' })
  @ApiBadRequestResponse({
    description: 'Invalid user profile',
    type: UpdateUserProfileDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    return this.userProfileService.updateById(id, updateUserProfileDto);
  }

  @ApiOperation({ summary: 'Update user profile by user id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid user id' })
  @ApiBadRequestResponse({
    description: 'Invalid user profile',
    type: UpdateUserProfileDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Patch('user/:user_id')
  async updateByUserId(
    @Param('user_id') user_id: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    return this.userProfileService.updateByUserId(
      user_id,
      updateUserProfileDto,
    );
  }

  @ApiOperation({ summary: 'Delete user profile by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid id' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Delete(':id')
  async removeById(@Param('id') id: string): Promise<UserProfile> {
    return this.userProfileService.removeById(id);
  }

  @ApiOperation({ summary: 'Delete user profile by user id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid user id' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Delete('user/:user_id')
  async removeByUserId(
    @Param('user_id') user_id: string,
  ): Promise<UserProfile> {
    return this.userProfileService.removeByUserId(user_id);
  }
}
