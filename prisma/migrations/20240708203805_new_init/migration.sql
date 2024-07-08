-- CreateTable
CREATE TABLE `usuario` (
    `id` VARCHAR(191) NOT NULL,
    `dni` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `rol` ENUM('entrenador', 'atleta') NOT NULL DEFAULT 'atleta',
    `nacimiento` DATE NOT NULL,
    `password` VARCHAR(191) NULL,

    UNIQUE INDEX `usuario_dni_key`(`dni`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sector` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `es_individual` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prueba` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `id_sector` INTEGER NOT NULL,
    `unidades` ENUM('tiempo', 'distancia', 'puntos') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `id_lugar` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lugar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `latitud` DOUBLE NOT NULL,
    `longitud` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `competicion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_evento` INTEGER NOT NULL,
    `id_prueba` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `participacion` (
    `id` VARCHAR(191) NOT NULL,
    `id_competicion` INTEGER NOT NULL,
    `marca` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `compite` (
    `id_usuario` VARCHAR(191) NOT NULL,
    `id_participacion` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `compite_id_usuario_id_participacion_key`(`id_usuario`, `id_participacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `prueba` ADD CONSTRAINT `prueba_id_sector_fkey` FOREIGN KEY (`id_sector`) REFERENCES `sector`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evento` ADD CONSTRAINT `evento_id_lugar_fkey` FOREIGN KEY (`id_lugar`) REFERENCES `lugar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `competicion` ADD CONSTRAINT `competicion_id_evento_fkey` FOREIGN KEY (`id_evento`) REFERENCES `evento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `competicion` ADD CONSTRAINT `competicion_id_prueba_fkey` FOREIGN KEY (`id_prueba`) REFERENCES `prueba`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `participacion` ADD CONSTRAINT `participacion_id_competicion_fkey` FOREIGN KEY (`id_competicion`) REFERENCES `competicion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compite` ADD CONSTRAINT `compite_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `compite` ADD CONSTRAINT `compite_id_participacion_fkey` FOREIGN KEY (`id_participacion`) REFERENCES `participacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
