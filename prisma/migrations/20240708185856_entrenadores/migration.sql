/*
  Warnings:

  - You are about to drop the column `foto` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `foto`,
    ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `rol` ENUM('entrenador', 'atleta') NOT NULL DEFAULT 'atleta';
