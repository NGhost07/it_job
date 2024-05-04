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
import { SkillService } from './skill.service';
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
import { Role, Skill } from '@prisma/client';
import { CreateSkillDto, UpdateSkillDto } from './dto';
import { AccessTokenGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators';

@ApiTags('Skills')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized: Login first!' })
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @ApiOperation({ summary: 'Create new skill' })
  @ApiCreatedResponse({ description: 'Created' })
  @ApiBadRequestResponse({ description: 'Bad request', type: CreateSkillDto })
  @ApiInternalServerErrorResponse({ description: 'Invalid skill' })
  @ApiForbiddenResponse({ description: 'Forbidden: Requires admin rights' })
  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createSkillDto: CreateSkillDto): Promise<Skill> {
    return this.skillService.create(createSkillDto);
  }

  @ApiOperation({ summary: 'Get all skills' })
  @ApiOkResponse({ description: 'Ok' })
  @Get()
  async findAll(): Promise<Skill[]> {
    return this.skillService.findAll();
  }

  @ApiOperation({ summary: 'Get skill by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid id' })
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Skill> {
    return this.skillService.findOneById(id);
  }

  @ApiOperation({ summary: 'Get skill by skill name' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid skill name' })
  @Get('skills/:skill_name')
  async findOneByName(@Param('skill_name') skill_name: string): Promise<Skill> {
    return this.skillService.findOneByName(skill_name);
  }

  @ApiOperation({ summary: 'Update skill by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid id' })
  @ApiBadRequestResponse({ description: 'Bad request', type: UpdateSkillDto })
  @ApiForbiddenResponse({ description: 'Forbidden: Requires admin rights' })
  @Roles(Role.ADMIN)
  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ): Promise<Skill> {
    return this.skillService.updateById(id, updateSkillDto);
  }

  @ApiOperation({ summary: 'Update skill by skill name' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid skill name' })
  @ApiBadRequestResponse({ description: 'Bad request', type: UpdateSkillDto })
  @ApiForbiddenResponse({ description: 'Forbidden: Requires admin rights' })
  @Roles(Role.ADMIN)
  @Patch('skills/:skill_name')
  async updateByName(
    @Param('skill_name') skill_name: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ): Promise<Skill> {
    return this.skillService.updateByName(skill_name, updateSkillDto);
  }

  @ApiOperation({ summary: 'Delete skill by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid id' })
  @ApiForbiddenResponse({ description: 'Forbidden: Requires admin rights' })
  @Roles(Role.ADMIN)
  @Delete(':id')
  async removeById(@Param('id') id: string): Promise<Skill> {
    return this.skillService.removeById(id);
  }

  @ApiOperation({ summary: 'Delete skill by skill name' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid skill name' })
  @ApiForbiddenResponse({ description: 'Forbidden: Requires admin rights' })
  @Roles(Role.ADMIN)
  @Delete('skills/:skill_name')
  async removeByName(@Param('skill_name') skill_name: string): Promise<Skill> {
    return this.skillService.removeByName(skill_name);
  }
}
