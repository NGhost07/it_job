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
import { CertificateService } from './certificate.service';
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
import { Certificate, Role } from '@prisma/client';
import { CreateCertificateDto, UpdateCertificateDto } from './dto';
import { AccessTokenGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators';

@ApiTags('Certificates for user profile')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized: Login first!' })
@UseGuards(AccessTokenGuard, RolesGuard)
@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @ApiOperation({ summary: 'Create certificate for user profile' })
  @ApiCreatedResponse({ description: 'Created' })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: CreateCertificateDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Invalid certificate' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Post()
  async create(
    @Body() createCertificateDto: CreateCertificateDto,
  ): Promise<Certificate> {
    return this.certificateService.create(createCertificateDto);
  }

  @ApiOperation({ summary: 'Get all certificates of user profile' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiForbiddenResponse({ description: 'Forbidden: Requires admin rights' })
  @Roles(Role.ADMIN)
  @Get()
  async findAll(): Promise<Certificate[]> {
    return this.certificateService.findAll();
  }

  @ApiOperation({ summary: 'Get certificate by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid certificate id' })
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Certificate> {
    return this.certificateService.findOneById(id);
  }

  @ApiOperation({ summary: 'Get certificate by user profile id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid user profile id' })
  @Get('certificates/:userProfileId')
  async findManyByUserProfileId(
    @Param('userProfileId') userProfileId: string,
  ): Promise<Certificate[]> {
    return this.certificateService.findManyByUserProfileId(userProfileId);
  }

  @ApiOperation({ summary: 'Update certificate by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid certificate id' })
  @ApiBadRequestResponse({
    description: 'Invalid certificate',
    type: UpdateCertificateDto,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCertificateDto: UpdateCertificateDto,
  ): Promise<Certificate> {
    return this.certificateService.update(id, updateCertificateDto);
  }

  @ApiOperation({ summary: 'Delete certificate by id' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiInternalServerErrorResponse({ description: 'Invalid certificate id' })
  @ApiForbiddenResponse({
    description: 'Forbidden: Requires admin or user rights',
  })
  @Roles(Role.ADMIN, Role.USER)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Certificate> {
    return this.certificateService.remove(id);
  }
}
