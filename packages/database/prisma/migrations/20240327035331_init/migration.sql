/*
  Warnings:

  - You are about to alter the column `xcoord` on the `Node` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `ycoord` on the `Node` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Made the column `xcoord` on table `Node` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ycoord` on table `Node` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Node" ALTER COLUMN "xcoord" SET NOT NULL,
ALTER COLUMN "xcoord" SET DATA TYPE INTEGER,
ALTER COLUMN "ycoord" SET NOT NULL,
ALTER COLUMN "ycoord" SET DATA TYPE INTEGER;
