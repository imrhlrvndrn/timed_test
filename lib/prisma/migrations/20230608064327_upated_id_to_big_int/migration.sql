/*
  Warnings:

  - The primary key for the `option` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `option` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `questionId` column on the `option` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `question` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `question` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `testsetId` column on the `question` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `test` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `test` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `testset` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `testset` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `testId` on the `testset` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "option" DROP CONSTRAINT "option_questionId_fkey";

-- DropForeignKey
ALTER TABLE "question" DROP CONSTRAINT "question_testsetId_fkey";

-- DropForeignKey
ALTER TABLE "testset" DROP CONSTRAINT "testset_testId_fkey";

-- AlterTable
ALTER TABLE "option" DROP CONSTRAINT "option_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
DROP COLUMN "questionId",
ADD COLUMN     "questionId" BIGINT,
ADD CONSTRAINT "option_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "question" DROP CONSTRAINT "question_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
DROP COLUMN "testsetId",
ADD COLUMN     "testsetId" BIGINT,
ADD CONSTRAINT "question_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "test" DROP CONSTRAINT "test_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "test_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "testset" DROP CONSTRAINT "testset_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
DROP COLUMN "testId",
ADD COLUMN     "testId" BIGINT NOT NULL,
ADD CONSTRAINT "testset_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "testset" ADD CONSTRAINT "testset_testId_fkey" FOREIGN KEY ("testId") REFERENCES "test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_testsetId_fkey" FOREIGN KEY ("testsetId") REFERENCES "testset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "option" ADD CONSTRAINT "option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE SET NULL ON UPDATE CASCADE;
