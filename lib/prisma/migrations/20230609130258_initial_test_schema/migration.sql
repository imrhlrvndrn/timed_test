-- CreateTable
CREATE TABLE "test" (
    "id" BIGSERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testset" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "testId" BIGINT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "duration" INTEGER NOT NULL DEFAULT 5,

    CONSTRAINT "testset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" BIGSERIAL NOT NULL,
    "testsetId" BIGINT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "solution" TEXT NOT NULL,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "option" (
    "id" BIGSERIAL NOT NULL,
    "questionId" BIGINT,
    "content" TEXT NOT NULL,

    CONSTRAINT "option_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "testset" ADD CONSTRAINT "testset_testId_fkey" FOREIGN KEY ("testId") REFERENCES "test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_testsetId_fkey" FOREIGN KEY ("testsetId") REFERENCES "testset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "option" ADD CONSTRAINT "option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE SET NULL ON UPDATE CASCADE;
