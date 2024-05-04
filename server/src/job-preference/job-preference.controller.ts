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
import { JobPreferenceService } from './job-preference.service';
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
import { JobPreference, Role } from '@prisma/client';
import { CreateJobPreferenceDto, UpdateJobPreferenceDto } from './dto';
import { AccessTokenGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators';

@ApiTags('JobPreference for user profile')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized: Login first!' })
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('job-preference')
export class JobPreferenceController {
  constructor(private readonly jobPreferenceService: JobPreferenceService) {}

  @ApiOperation({ summary: 'Create new job preference for user profile' })
  @ApiCreatedResponse({ description: 'Created' })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: CreateJobPreferenceDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Invalid job preference' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Post()
  async create(
    @Body() createJobPreferenceDto: CreateJobPreferenceDto,
  ): Promise<JobPreference> {
    return this.jobPreferenceService.create(createJobPreferenceDto);
  }

  @ApiOperation({ summary: 'Get all job preferences of user profile' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiForbiddenResponse({ description: 'Forbidden: Requires admin rights' })
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<JobPreference[]> {
    return this.jobPreferenceService.findAll();
  }

  @ApiOperation({ summary: 'Get job preference by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid job preference id' })
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<JobPreference> {
    return this.jobPreferenceService.findOneById(id);
  }

  @ApiOperation({ summary: 'Get job preference by user profile id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid user profile id' })
  @Get('user-profile/:userProfileId')
  async findManyByUserProfileId(
    @Param('userProfileId') userProfileId: string,
  ): Promise<JobPreference[]> {
    return this.jobPreferenceService.findManyByUserProfileId(userProfileId);
  }

  @ApiOperation({ summary: 'Update job preference by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid job preference id' })
  @ApiBadRequestResponse({
    description: 'Invalid job preference',
    type: UpdateJobPreferenceDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateJobPreferenceDto: UpdateJobPreferenceDto,
  ): Promise<JobPreference> {
    return this.jobPreferenceService.updateById(id, updateJobPreferenceDto);
  }

  @ApiOperation({ summary: 'Delete job preference by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid job preference id' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Delete(':id')
  async removeById(@Param('id') id: string): Promise<JobPreference> {
    return this.jobPreferenceService.removeById(id);
  }
}
