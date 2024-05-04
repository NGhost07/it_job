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
import { AwardService } from './award.service';
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
import { Award, Role } from '@prisma/client';
import { CreateAwardDto, UpdateAwardDto } from './dto';
import { AccessTokenGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators';

@ApiTags('Awards for user profile')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized: Login first!' })
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('award')
export class AwardController {
  constructor(private readonly awardService: AwardService) {}

  @ApiOperation({ summary: 'Create new award for user profile' })
  @ApiCreatedResponse({ description: 'Created' })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: CreateAwardDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Invalid award' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Post()
  async create(@Body() createAwardDto: CreateAwardDto): Promise<Award> {
    return this.awardService.create(createAwardDto);
  }

  @ApiOperation({ summary: 'Get all awards of user profiles' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiForbiddenResponse({ description: 'Forbidden: Requires admin rights' })
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<Award[]> {
    return this.awardService.findAll();
  }

  @ApiOperation({ summary: 'Get award by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid award id' })
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Award> {
    return this.awardService.findOneById(id);
  }

  @ApiOperation({ summary: 'Get awards by user profile id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid user profile id' })
  @Get('awards/:userProfileId')
  async findManyByUserProfileId(
    @Param('userProfileId') userProfileId: string,
  ): Promise<Award[]> {
    return this.awardService.findManyByUserProfileId(userProfileId);
  }

  @ApiOperation({ summary: 'Update award by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid award id' })
  @ApiBadRequestResponse({
    description: 'Invalid award',
    type: UpdateAwardDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAwardDto: UpdateAwardDto,
  ): Promise<Award> {
    return this.awardService.update(id, updateAwardDto);
  }

  @ApiOperation({ summary: 'Delete award by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid award id' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Award> {
    return this.awardService.remove(id);
  }
}
