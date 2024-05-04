import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CityModule } from './city/city.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { SkillModule } from './skill/skill.module';
import { EducationModule } from './education/education.module';
import { WorkExperienceModule } from './work-experience/work-experience.module';
import { PersonalProjectModule } from './personal-project/personal-project.module';
import { CertificateModule } from './certificate/certificate.module';
import { AwardModule } from './award/award.module';
import { CompanyInforModule } from './company-infor/company-infor.module';
import { JobPreferenceModule } from './job-preference/job-preference.module';
import { JobModule } from './job/job.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    CityModule,
    UserProfileModule,
    SkillModule,
    EducationModule,
    WorkExperienceModule,
    PersonalProjectModule,
    CertificateModule,
    AwardModule,
    CompanyInforModule,
    JobPreferenceModule,
    JobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
