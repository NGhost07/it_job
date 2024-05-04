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
import { PersonalProjectService } from './personal-project.service';
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
import { PersonalProject, Role } from '@prisma/client';
import { CreatePersonalProjectDto, UpdatePersonalProjectDto } from './dto';
import { AccessTokenGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators';

@ApiTags('Personal project for user profile')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized: Login first!' })
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('personal-project')
export class PersonalProjectController {
  constructor(
    private readonly personalProjectService: PersonalProjectService,
  ) {}

  @ApiOperation({ summary: 'Create new personal project for user profile' })
  @ApiCreatedResponse({ description: 'Created' })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: CreatePersonalProjectDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Invalid personal project' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Post()
  async create(
    @Body() createPersonalProjectDto: CreatePersonalProjectDto,
  ): Promise<PersonalProject> {
    return this.personalProjectService.create(createPersonalProjectDto);
  }

  @ApiOperation({ summary: 'Get all personal projects of user profile' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiForbiddenResponse({ description: 'Forbidden: Requires admin rights' })
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<PersonalProject[]> {
    return this.personalProjectService.findAll();
  }

  @ApiOperation({ summary: 'Get personal project by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({
    description: 'Invalid personal project id',
  })
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<PersonalProject> {
    return this.personalProjectService.findOneById(id);
  }

  @ApiOperation({ summary: 'Get personal project by user profile id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({
    description: 'Invalid user profile id',
  })
  @Get('personal-projects/:userProfileid')
  async findManyByUserProfileId(
    @Param('userProfileId') userProfileId: string,
  ): Promise<PersonalProject[]> {
    return this.personalProjectService.findManyByUserProfileId(userProfileId);
  }

  @ApiOperation({ summary: 'Update personal project by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({
    description: 'Invalid personal project id',
  })
  @ApiBadRequestResponse({
    description: 'Invalid personal project',
    type: UpdatePersonalProjectDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePersonalProjectDto: UpdatePersonalProjectDto,
  ): Promise<PersonalProject> {
    return this.personalProjectService.update(id, updatePersonalProjectDto);
  }

  @ApiOperation({ summary: 'Delete personal project by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({
    description: 'Invalid personal project id',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PersonalProject> {
    return this.personalProjectService.remove(id);
  }
}
