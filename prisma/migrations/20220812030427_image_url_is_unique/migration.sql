/*
  Warnings:

  - A unique constraint covering the columns `[secure_url]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Image_secure_url_key` ON `Image`(`secure_url`);

-- CreateIndex
CREATE UNIQUE INDEX `Image_url_key` ON `Image`(`url`);
