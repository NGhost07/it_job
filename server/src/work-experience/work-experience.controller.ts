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
import { WorkExperienceService } from './work-experience.service';
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
import { Role, WorkExperience } from '@prisma/client';
import { CreateWorkExperienceDto, UpdateWorkExperienceDto } from './dto';
import { AccessTokenGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators';

@ApiTags('Work Experience for user profile')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized: Login first!' })
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('work-experience')
export class WorkExperienceController {
  constructor(private readonly workExperienceService: WorkExperienceService) {}

  @ApiOperation({ summary: 'Create new work experience for user profile' })
  @ApiCreatedResponse({ description: 'Created' })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: CreateWorkExperienceDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Invalid work experience' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Post()
  async create(
    @Body() createWorkExperienceDto: CreateWorkExperienceDto,
  ): Promise<WorkExperience> {
    return this.workExperienceService.create(createWorkExperienceDto);
  }

  @ApiOperation({ summary: 'Get all work experience of user profile' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiForbiddenResponse({ description: 'Forbidden: Requires admin rights' })
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<WorkExperience[]> {
    return this.workExperienceService.findAll();
  }

  @ApiOperation({ summary: 'Get work experience by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid work experience id' })
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<WorkExperience> {
    return this.workExperienceService.findOneById(id);
  }

  @ApiOperation({ summary: 'Get work experiences by user profile id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid user profile id' })
  @Get('work-experiences/:userProfileId')
  async findManyByUserProfileId(
    @Param('userProfileId') userProfileId: string,
  ): Promise<WorkExperience[]> {
    return this.workExperienceService.findManyByUserProfileId(userProfileId);
  }

  @ApiOperation({ summary: 'Update work experience by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid work experience id' })
  @ApiBadRequestResponse({
    description: 'Invalid work experience',
    type: UpdateWorkExperienceDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWorkExperienceDto: UpdateWorkExperienceDto,
  ): Promise<WorkExperience> {
    return this.workExperienceService.update(id, updateWorkExperienceDto);
  }

  @ApiOperation({ summary: 'Delete work experience by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid work experience id' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<WorkExperience> {
    return this.workExperienceService.remove(id);
  }
}
