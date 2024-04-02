/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[startNodeID,endNodeID]` on the table `Edge` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailAddress` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "email",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "emailAddress" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "userID" SERIAL NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userID");

-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Admin" (
    "adminID" SERIAL NOT NULL,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminID")
);

-- CreateTable
CREATE TABLE "Patient" (
    "patientID" SERIAL NOT NULL,
    "roomID" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("patientID")
);

-- CreateTable
CREATE TABLE "MedicalWorker" (
    "medicalID" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,

    CONSTRAINT "MedicalWorker_pkey" PRIMARY KEY ("medicalID")
);

-- CreateTable
CREATE TABLE "MedicalAssignments" (
    "assignmentID" SERIAL NOT NULL,
    "medicalID" INTEGER NOT NULL,
    "patientID" INTEGER NOT NULL,

    CONSTRAINT "MedicalAssignments_pkey" PRIMARY KEY ("assignmentID")
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicalAssignments_medicalID_patientID_key" ON "MedicalAssignments"("medicalID", "patientID");

-- CreateIndex
CREATE UNIQUE INDEX "Edge_startNodeID_endNodeID_key" ON "Edge"("startNodeID", "endNodeID");

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES "Node"("nodeID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalWorker" ADD CONSTRAINT "MedicalWorker_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalAssignments" ADD CONSTRAINT "MedicalAssignments_medicalID_fkey" FOREIGN KEY ("medicalID") REFERENCES "MedicalWorker"("medicalID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalAssignments" ADD CONSTRAINT "MedicalAssignments_patientID_fkey" FOREIGN KEY ("patientID") REFERENCES "Patient"("patientID") ON DELETE RESTRICT ON UPDATE CASCADE;
