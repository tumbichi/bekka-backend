/*
  Warnings:

  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `User` table. All the data in the column will be lost.
  - Added the required column `city` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Address` ADD COLUMN `city` VARCHAR(255) NOT NULL,
    ADD COLUMN `country` VARCHAR(255) NOT NULL,
    MODIFY `street` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `city`,
    DROP COLUMN `country`;
