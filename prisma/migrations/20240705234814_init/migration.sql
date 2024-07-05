-- CreateTable
CREATE TABLE `Usuario` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `nacimiento` DATETIME(3) NOT NULL,
    `foto` VARCHAR(191) NULL,
    `tipo` ENUM('administrador', 'entrenador', 'atleta') NOT NULL DEFAULT 'atleta',

    UNIQUE INDEX `Usuario_nombre_nacimiento_key`(`nombre`, `nacimiento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sector` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `esIndividual` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Prueba` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `idSector` INTEGER NOT NULL,
    `unidades` ENUM('tiempo', 'distancia', 'puntos') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Evento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `idLugar` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lugar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `latitud` DOUBLE NOT NULL,
    `longitud` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Competicion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idEvento` INTEGER NOT NULL,
    `idPrueba` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Participacion` (
    `id` VARCHAR(191) NOT NULL,
    `idUsuario` VARCHAR(191) NULL,
    `idCompeticion` INTEGER NOT NULL,
    `marca` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Prueba` ADD CONSTRAINT `Prueba_idSector_fkey` FOREIGN KEY (`idSector`) REFERENCES `Sector`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evento` ADD CONSTRAINT `Evento_idLugar_fkey` FOREIGN KEY (`idLugar`) REFERENCES `Lugar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Competicion` ADD CONSTRAINT `Competicion_idEvento_fkey` FOREIGN KEY (`idEvento`) REFERENCES `Evento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Competicion` ADD CONSTRAINT `Competicion_idPrueba_fkey` FOREIGN KEY (`idPrueba`) REFERENCES `Prueba`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participacion` ADD CONSTRAINT `Participacion_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participacion` ADD CONSTRAINT `Participacion_idCompeticion_fkey` FOREIGN KEY (`idCompeticion`) REFERENCES `Competicion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
