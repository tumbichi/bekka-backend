-- DropForeignKey
ALTER TABLE `Address` DROP FOREIGN KEY `Address_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Store` DROP FOREIGN KEY `Store_userId_fkey`;

-- AlterTable
ALTER TABLE `Product` MODIFY `count` INTEGER NOT NULL DEFAULT 1;
