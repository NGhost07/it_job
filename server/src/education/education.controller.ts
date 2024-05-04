import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EducationService } from './education.service';
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
import { Education, Role } from '@prisma/client';
import { CreateEducationDto, UpdateEducationDto } from './dto';
import { AccessTokenGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators';

@ApiTags('Education for user profile')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized: Login first!' })
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @ApiOperation({ summary: 'Create new education for user profile' })
  @ApiCreatedResponse({ description: 'Created' })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: CreateEducationDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Invalid education' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Post()
  async create(
    @Body() createEducationDto: CreateEducationDto,
  ): Promise<Education> {
    return this.educationService.create(createEducationDto);
  }

  @ApiOperation({ summary: 'Get all educations of user profile' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiForbiddenResponse({ description: 'Forbidden: Requires admin rights' })
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<Education[]> {
    return this.educationService.findAll();
  }

  @ApiOperation({ summary: 'Get education by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid education id' })
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Education> {
    return this.educationService.findOneById(id);
  }

  @ApiOperation({ summary: 'Get educations by user profile id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid user profile id' })
  @Get('user-profile/:userProfileId')
  async findManyByUserProfileId(
    @Param('userProfileId') userProfileId: string,
  ): Promise<Education[]> {
    return this.educationService.findManyByUserProfileId(userProfileId);
  }

  @ApiOperation({ summary: 'Update education by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid education id' })
  @ApiBadRequestResponse({
    description: 'Invalid education',
    type: UpdateEducationDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEducationDto: UpdateEducationDto,
  ): Promise<Education> {
    return this.educationService.update(id, updateEducationDto);
  }

  @ApiOperation({ summary: 'Delete education by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid education id' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Education> {
    return this.educationService.remove(id);
  }
}
