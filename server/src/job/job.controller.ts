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
import { JobService } from './job.service';
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
import { Job, Role } from '@prisma/client';
import { CreateJobDto, UpdateJobDto } from './dto';
import { AccessTokenGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators';

@ApiTags('Jobs')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized: Login first!' })
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @ApiOperation({ summary: 'Create new job' })
  @ApiCreatedResponse({ description: 'Created' })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: CreateJobDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Invalid job' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or company rights',
  })
  @Roles(Role.ADMIN, Role.COMPANY)
  @Post()
  async create(@Body() createJobDto: CreateJobDto): Promise<Job> {
    return this.jobService.create(createJobDto);
  }

  @ApiOperation({ summary: 'Get all jobs' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiForbiddenResponse({ description: 'Forbidden: Requires admin rights' })
  @Roles(Role.ADMIN, Role.COMPANY)
  @Get()
  async findAll(): Promise<Job[]> {
    return this.jobService.findAll();
  }

  @ApiOperation({ summary: 'Get job by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid job id' })
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Job> {
    return this.jobService.findOneById(id);
  }

  @ApiOperation({ summary: 'Get jobs by company infor id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid company infor id' })
  @Get('copany-infor/:copanyInforId')
  async findManyByCompanyInforId(
    @Param('copanyInforId') copanyInforId: string,
  ): Promise<Job[]> {
    return this.jobService.findManyByCompanyInforId(copanyInforId);
  }

  @ApiOperation({ summary: 'Update job by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid job id' })
  @ApiBadRequestResponse({
    description: 'Invalid job',
    type: UpdateJobDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or company rights',
  })
  @Roles(Role.ADMIN, Role.COMPANY)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
  ): Promise<Job> {
    return this.jobService.update(id, updateJobDto);
  }

  @ApiOperation({ summary: 'Delete job by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid job id' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or company rights',
  })
  @Roles(Role.ADMIN, Role.COMPANY)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Job> {
    return this.jobService.remove(id);
  }
}
