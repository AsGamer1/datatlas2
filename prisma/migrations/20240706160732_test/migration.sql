/*
  Warnings:

  - You are about to drop the column `password` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[dni]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dni` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Usuario_nombre_nacimiento_key` ON `usuario`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `password`,
    DROP COLUMN `tipo`,
    ADD COLUMN `dni` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_dni_key` ON `Usuario`(`dni`);
