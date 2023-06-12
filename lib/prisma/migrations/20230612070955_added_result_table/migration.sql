-- CreateTable
CREATE TABLE "result" (
    "id" BIGSERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fullName" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "testId" BIGINT NOT NULL,
    "testsetId" BIGINT NOT NULL,

    CONSTRAINT "result_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "result" ADD CONSTRAINT "result_testId_fkey" FOREIGN KEY ("testId") REFERENCES "test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "result" ADD CONSTRAINT "result_testsetId_fkey" FOREIGN KEY ("testsetId") REFERENCES "testset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
