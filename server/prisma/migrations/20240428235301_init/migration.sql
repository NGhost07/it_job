-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'COMPANY');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'ORTHERS');

-- CreateEnum
CREATE TYPE "EducationalStatus" AS ENUM ('IN_PROCESS', 'GRADUATED');

-- CreateEnum
CREATE TYPE "JobLevel" AS ENUM ('FRESHER', 'JUNIOR', 'SENIOR', 'MANAGER');

-- CreateEnum
CREATE TYPE "WorkingType" AS ENUM ('AT_OFFICE', 'REMOTE', 'HYBRID');

-- CreateEnum
CREATE TYPE "CompanyType" AS ENUM ('IT_OUTSOURCING', 'IT_PRODUCT', 'IT_SERVICE_AND_CONSULTING', 'NON_IT', 'ORTHERS');

-- CreateTable
CREATE TABLE "City" (
    "city_id" TEXT NOT NULL,
    "city_name" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("city_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "refresh_token" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "skill_id" TEXT NOT NULL,
    "skill_name" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("skill_id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "userProfile_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "profile_photo_url" TEXT,
    "cover_photo_url" TEXT,
    "gender" "Gender",
    "address" TEXT,
    "about_me" TEXT,
    "cv_url" TEXT,
    "cover_letter_url" TEXT,
    "userId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("userProfile_id")
);

-- CreateTable
CREATE TABLE "SkillsOnUserProfiles" (
    "skillId" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SkillsOnUserProfiles_pkey" PRIMARY KEY ("skillId","userProfileId")
);

-- CreateTable
CREATE TABLE "Education" (
    "education_id" TEXT NOT NULL,
    "educational_facility" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "educational_status" "EducationalStatus" NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3),
    "additional_details" TEXT NOT NULL,
    "userProfileId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("education_id")
);

-- CreateTable
CREATE TABLE "WorkExperience" (
    "workExperience_id" TEXT NOT NULL,
    "job_title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "project" TEXT,
    "userProfileId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("workExperience_id")
);

-- CreateTable
CREATE TABLE "PersonalProject" (
    "personalProject_id" TEXT NOT NULL,
    "personalProject_name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "project_url" TEXT,
    "userProfileId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonalProject_pkey" PRIMARY KEY ("personalProject_id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "certificate_id" TEXT NOT NULL,
    "certificate_name" TEXT NOT NULL,
    "certificate_url" TEXT,
    "organization" TEXT NOT NULL,
    "issue_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "userProfileId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("certificate_id")
);

-- CreateTable
CREATE TABLE "Award" (
    "award_id" TEXT NOT NULL,
    "award_name" TEXT NOT NULL,
    "award_url" TEXT,
    "issue_date" TIMESTAMP(3),
    "description" TEXT,
    "userProfileId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Award_pkey" PRIMARY KEY ("award_id")
);

-- CreateTable
CREATE TABLE "CompanyInfor" (
    "companyInfor_id" TEXT NOT NULL,
    "profile_photo_url" TEXT,
    "cover_photo_url" TEXT,
    "company_name" TEXT NOT NULL,
    "company_location" TEXT NOT NULL,
    "company_type" "CompanyType" NOT NULL,
    "company_size" TEXT NOT NULL,
    "company_overview" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "working_days" TEXT NOT NULL,
    "overtime_policy" TEXT NOT NULL,
    "website_url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyInfor_pkey" PRIMARY KEY ("companyInfor_id")
);

-- CreateTable
CREATE TABLE "CompaniesInforOnCities" (
    "companyInforId" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompaniesInforOnCities_pkey" PRIMARY KEY ("companyInforId","cityId")
);

-- CreateTable
CREATE TABLE "JobPreference" (
    "jobPreference_id" TEXT NOT NULL,
    "job_level" "JobLevel",
    "current_salary" DECIMAL(65,30),
    "expected_salary" DECIMAL(65,30),
    "working_type" "WorkingType",
    "company_type" "CompanyType",
    "userProfileId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobPreference_pkey" PRIMARY KEY ("jobPreference_id")
);

-- CreateTable
CREATE TABLE "SkillsOnJobPreferences" (
    "skillId" TEXT NOT NULL,
    "jobPreferenceId" TEXT NOT NULL,

    CONSTRAINT "SkillsOnJobPreferences_pkey" PRIMARY KEY ("skillId","jobPreferenceId")
);

-- CreateTable
CREATE TABLE "JobPreferencesOnCities" (
    "jobPreferenceId" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobPreferencesOnCities_pkey" PRIMARY KEY ("jobPreferenceId","cityId")
);

-- CreateTable
CREATE TABLE "Job" (
    "job_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT,
    "benefits" TEXT,
    "jobLevels" "JobLevel",
    "salary_min" DECIMAL(65,30),
    "salary_max" DECIMAL(65,30),
    "working_type" "WorkingType" NOT NULL,
    "companyInforId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("job_id")
);

-- CreateTable
CREATE TABLE "SkillsOnJobs" (
    "skillId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SkillsOnJobs_pkey" PRIMARY KEY ("skillId","jobId")
);

-- CreateIndex
CREATE UNIQUE INDEX "City_city_name_key" ON "City"("city_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_skill_name_key" ON "Skill"("skill_name");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyInfor_company_name_key" ON "CompanyInfor"("company_name");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyInfor_userId_key" ON "CompanyInfor"("userId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillsOnUserProfiles" ADD CONSTRAINT "SkillsOnUserProfiles_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("skill_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillsOnUserProfiles" ADD CONSTRAINT "SkillsOnUserProfiles_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("userProfile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("userProfile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("userProfile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalProject" ADD CONSTRAINT "PersonalProject_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("userProfile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("userProfile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Award" ADD CONSTRAINT "Award_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("userProfile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyInfor" ADD CONSTRAINT "CompanyInfor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompaniesInforOnCities" ADD CONSTRAINT "CompaniesInforOnCities_companyInforId_fkey" FOREIGN KEY ("companyInforId") REFERENCES "CompanyInfor"("companyInfor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompaniesInforOnCities" ADD CONSTRAINT "CompaniesInforOnCities_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("city_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPreference" ADD CONSTRAINT "JobPreference_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("userProfile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillsOnJobPreferences" ADD CONSTRAINT "SkillsOnJobPreferences_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("skill_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillsOnJobPreferences" ADD CONSTRAINT "SkillsOnJobPreferences_jobPreferenceId_fkey" FOREIGN KEY ("jobPreferenceId") REFERENCES "JobPreference"("jobPreference_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPreferencesOnCities" ADD CONSTRAINT "JobPreferencesOnCities_jobPreferenceId_fkey" FOREIGN KEY ("jobPreferenceId") REFERENCES "JobPreference"("jobPreference_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPreferencesOnCities" ADD CONSTRAINT "JobPreferencesOnCities_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("city_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyInforId_fkey" FOREIGN KEY ("companyInforId") REFERENCES "CompanyInfor"("companyInfor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillsOnJobs" ADD CONSTRAINT "SkillsOnJobs_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("skill_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillsOnJobs" ADD CONSTRAINT "SkillsOnJobs_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;
