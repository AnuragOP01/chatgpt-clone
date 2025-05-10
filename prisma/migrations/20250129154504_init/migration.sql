-- CreateEnum
CREATE TYPE "ChatStatus" AS ENUM ('ACTIVE', 'ARCHIVED', 'DELETED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatLookup" (
    "id" TEXT NOT NULL,
    "topicName" TEXT,
    "description" TEXT,
    "status" "ChatStatus" NOT NULL DEFAULT 'ACTIVE',
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatLookup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatQues" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "lookupId" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatQues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatAns" (
    "id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "metadata" JSONB,
    "questionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatAns_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "ChatLookup_userId_idx" ON "ChatLookup"("userId");

-- CreateIndex
CREATE INDEX "ChatQues_lookupId_idx" ON "ChatQues"("lookupId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatAns_questionId_key" ON "ChatAns"("questionId");

-- CreateIndex
CREATE INDEX "ChatAns_questionId_idx" ON "ChatAns"("questionId");

-- AddForeignKey
ALTER TABLE "ChatLookup" ADD CONSTRAINT "ChatLookup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatQues" ADD CONSTRAINT "ChatQues_lookupId_fkey" FOREIGN KEY ("lookupId") REFERENCES "ChatLookup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatAns" ADD CONSTRAINT "ChatAns_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "ChatQues"("id") ON DELETE CASCADE ON UPDATE CASCADE;
