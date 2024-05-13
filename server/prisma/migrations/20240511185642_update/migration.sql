-- CreateTable
CREATE TABLE "UserProfileOnJob" (
    "userProfileId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfileOnJob_pkey" PRIMARY KEY ("userProfileId","jobId")
);

-- AddForeignKey
ALTER TABLE "UserProfileOnJob" ADD CONSTRAINT "UserProfileOnJob_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("userProfile_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfileOnJob" ADD CONSTRAINT "UserProfileOnJob_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("job_id") ON DELETE CASCADE ON UPDATE CASCADE;
