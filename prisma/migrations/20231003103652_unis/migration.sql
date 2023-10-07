-- AlterTable
ALTER TABLE "StudyProgram" ALTER COLUMN "ApplyDate" DROP NOT NULL,
ALTER COLUMN "startDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "University" ALTER COLUMN "universityLink" DROP NOT NULL;
