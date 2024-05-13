import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
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
import { GetUserId, Roles } from 'src/auth/decorators';
import { UserProfileService } from './user-profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { storageConfig } from 'helpers/config';

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
    @GetUserId() user_id: string,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ): Promise<UserProfile> {
    return this.userProfileService.create(user_id, createUserProfileDto);
  }

  @ApiOperation({ summary: 'Get all user profile' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiForbiddenResponse({ description: 'Forbidden: Requires admin rights' })
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<UserProfile[]> {
    return this.userProfileService.findAll();
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiOkResponse({ description: 'Ok' })
  @Get('user')
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  async findOneByUserId(@GetUserId() user_id: string): Promise<UserProfile> {
    return this.userProfileService.findOneByUserId(user_id);
  }

  @ApiOperation({ summary: 'Update user profile' })
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
  @Patch('user')
  async updateByUserId(
    @GetUserId() user_id: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    return this.userProfileService.updateByUserId(
      user_id,
      updateUserProfileDto,
    );
  }

  @ApiOperation({ summary: 'Delete user profile' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid user id' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Delete('user/:user_id')
  async removeByUserId(@GetUserId() user_id: string): Promise<UserProfile> {
    return this.userProfileService.removeByUserId(user_id);
  }

  @Patch('update-avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: storageConfig('avatar'),
      fileFilter: (req, file, cb) => {
        const ext = extname(file.originalname);
        const allowedExtArr = ['.jpg', '.png', '.jpeg'];
        if (!allowedExtArr.includes(ext)) {
          req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 1024 * 1024 * 5) {
            req.fileValidationError =
              'File size is too large. Accepted file size is less than 5 MB';
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
    }),
  )
  updateAvatar(
    @GetUserId() user_id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userProfileService.updateAvatar(
      user_id,
      file.destination + '/' + file.filename,
    );
  }
}
