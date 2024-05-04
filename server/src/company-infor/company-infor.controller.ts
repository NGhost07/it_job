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
import { CompanyInforService } from './company-infor.service';
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
import { CompanyInfor, Role } from '@prisma/client';
import { CreateCompanyInforDto, UpdateCompanyInforDto } from './dto';
import { AccessTokenGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators';

@ApiTags('Company Infors')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized: Login first!' })
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('company-infor')
export class CompanyInforController {
  constructor(private readonly companyInforService: CompanyInforService) {}

  @ApiOperation({ summary: 'Create new company infor' })
  @ApiCreatedResponse({ description: 'Created' })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: CreateCompanyInforDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Invalid company infor' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or company rights',
  })
  @Roles(Role.ADMIN, Role.COMPANY)
  @Post()
  async create(
    @Body() createCompanyInforDto: CreateCompanyInforDto,
  ): Promise<CompanyInfor> {
    return this.companyInforService.create(createCompanyInforDto);
  }

  @ApiOperation({ summary: 'Get all companies infors' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiForbiddenResponse({ description: 'Forbidden: Requires admin rights' })
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<CompanyInfor[]> {
    return this.companyInforService.findAll();
  }

  @ApiOperation({ summary: 'Get company infor by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid company id' })
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<CompanyInfor> {
    return this.companyInforService.findOneById(id);
  }

  @ApiOperation({ summary: 'Get company infor by user id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid user id' })
  @Get('company/:userId')
  async findOneByUserId(
    @Param('userId') userId: string,
  ): Promise<CompanyInfor> {
    return this.companyInforService.findOneByUserId(userId);
  }

  @ApiOperation({ summary: 'Get company infor by name' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid company name' })
  @Get('company-name/:name')
  async findOneByName(@Param('name') name: string): Promise<CompanyInfor> {
    return this.companyInforService.findOneByName(name);
  }

  @ApiOperation({ summary: 'Update company infor by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid company infor id' })
  @ApiBadRequestResponse({
    description: 'Invalid company infor',
    type: UpdateCompanyInforDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or company rights',
  })
  @Roles(Role.ADMIN, Role.COMPANY)
  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateCompanyInforDto: UpdateCompanyInforDto,
  ): Promise<CompanyInfor> {
    return this.companyInforService.updateById(id, updateCompanyInforDto);
  }

  @ApiOperation({ summary: 'Update company infor by user id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid user id' })
  @ApiBadRequestResponse({
    description: 'Invalid company infor',
    type: UpdateCompanyInforDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or company rights',
  })
  @Roles(Role.ADMIN, Role.COMPANY)
  @Patch('company/:userId')
  async updateByUserId(
    @Param('userId') userId: string,
    @Body() updateCompanyInforDto: UpdateCompanyInforDto,
  ): Promise<CompanyInfor> {
    return this.companyInforService.updateByUserId(
      userId,
      updateCompanyInforDto,
    );
  }

  @ApiOperation({ summary: 'Delete company infor by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid company infor id' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or company rights',
  })
  @Roles(Role.ADMIN, Role.COMPANY)
  @Delete(':id')
  async removeById(@Param('id') id: string): Promise<CompanyInfor> {
    return this.companyInforService.removeById(id);
  }

  @ApiOperation({ summary: 'Delete company infor by user id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid user id' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or company rights',
  })
  @Roles(Role.ADMIN, Role.COMPANY)
  @Delete('user/:userId')
  async removeByUserId(@Param('userId') userId: string): Promise<CompanyInfor> {
    return this.companyInforService.removeByUserId(userId);
  }
}
