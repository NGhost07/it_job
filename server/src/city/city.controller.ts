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
import { CityService } from './city.service';
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
import { City, CompanyInfor, JobPreference, Role } from '@prisma/client';
import { AccessTokenGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators';
import { CreateCityDto, UpdateCityDto } from './dto';

@ApiTags('Cities')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized: Login first!' })
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @ApiOperation({ summary: 'Create new city' })
  @ApiForbiddenResponse({ description: 'Forbidden: Requires admin rights' })
  @ApiCreatedResponse({ description: 'Created' })
  @ApiBadRequestResponse({ description: 'Bad request', type: CreateCityDto })
  @ApiInternalServerErrorResponse({ description: 'Invalid city_name' })
  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() createCityDto: CreateCityDto): Promise<City> {
    return this.cityService.create(createCityDto);
  }

  @ApiOperation({ summary: 'Get all cities' })
  @ApiOkResponse({ description: 'Ok' })
  @Get()
  async findAll(): Promise<City[]> {
    return this.cityService.findAll();
  }

  @ApiOperation({ summary: 'Get city by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid id' })
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<City> {
    return this.cityService.findOneById(id);
  }

  @ApiOperation({ summary: 'Get Job Preference by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid id' })
  @Get('/jobPreferences/:id')
  async findJobPreferencesById(
    @Param('id') id: string,
  ): Promise<JobPreference[]> {
    return this.cityService.findJobPreferencesById(id);
  }

  @ApiOperation({ summary: 'Get Job Preference by name' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid name' })
  @Get('/jobPreferences/:name')
  async findJobPreferencesByName(
    @Param('name') name: string,
  ): Promise<JobPreference[]> {
    return this.cityService.findJobPreferencesByName(name);
  }

  @ApiOperation({ summary: 'Get Company Infor by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid id' })
  @Get('/companiesInfor/:id')
  async findCompaniesInforById(
    @Param('id') id: string,
  ): Promise<CompanyInfor[]> {
    return this.cityService.findCompaniesInforById(id);
  }

  @ApiOperation({ summary: 'Get Company Infor by name' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid name' })
  @Get('/companiesInfor/:name')
  async findCompaniesInforByName(
    @Param('name') name: string,
  ): Promise<CompanyInfor[]> {
    return this.cityService.findCompaniesInforByName(name);
  }

  @ApiOperation({ summary: 'Get city by name' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid name' })
  @Get('cities/:name')
  async findOneByName(@Param('name') name: string): Promise<City> {
    return this.cityService.findOneByName(name);
  }

  @ApiOperation({ summary: 'Update city by id' })
  @ApiForbiddenResponse({ description: 'Forbidden: Requires admin rights' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid id' })
  @ApiBadRequestResponse({ description: 'Bad request', type: UpdateCityDto })
  @Roles(Role.ADMIN)
  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateCityDto: UpdateCityDto,
  ): Promise<City> {
    return this.cityService.updateById(id, updateCityDto);
  }

  @ApiOperation({ summary: 'Update city by name' })
  @ApiForbiddenResponse({ description: 'Forbidden: Requires admin rights' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid name' })
  @ApiBadRequestResponse({ description: 'Bad request', type: UpdateCityDto })
  @Patch('cities/:name')
  async updateByName(
    @Param('name') name: string,
    @Body() updateCityDto: UpdateCityDto,
  ): Promise<City> {
    return this.cityService.updateByName(name, updateCityDto);
  }

  @ApiOperation({ summary: 'Delete city by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid id' })
  @ApiForbiddenResponse({ description: 'Forbidden: Requires admin rights' })
  @Roles(Role.ADMIN)
  @Delete(':id')
  async removeById(@Param('id') id: string) {
    return this.cityService.removeById(id);
  }

  @ApiOperation({ summary: 'Delete city by name' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid name' })
  @ApiForbiddenResponse({ description: 'Forbidden: Requires admin rights' })
  @Roles(Role.ADMIN)
  @Delete('cities/:name')
  async removeByName(@Param('name') name: string) {
    return this.cityService.removeByName(name);
  }
}
