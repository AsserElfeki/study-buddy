-- CreateTable
CREATE TABLE "personal_infos" (
    "id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "nationality" TEXT NOT NULL,

    CONSTRAINT "personal_infos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "educational_backgrounds" (
    "id" TEXT NOT NULL,
    "application_id" TEXT NOT NULL,
    "highestQualification" TEXT NOT NULL,
    "institutionName" TEXT NOT NULL,
    "graduationYear" INTEGER NOT NULL,

    CONSTRAINT "educational_backgrounds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "personal_infos_application_id_key" ON "personal_infos"("application_id");

-- CreateIndex
CREATE UNIQUE INDEX "educational_backgrounds_application_id_key" ON "educational_backgrounds"("application_id");

-- AddForeignKey
ALTER TABLE "personal_infos" ADD CONSTRAINT "personal_infos_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "educational_backgrounds" ADD CONSTRAINT "educational_backgrounds_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
