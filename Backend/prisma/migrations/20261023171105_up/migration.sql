-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Disco` (
    `id_disco` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `artista` VARCHAR(191) NOT NULL,
    `genero` VARCHAR(191) NOT NULL,
    `preco_custo` DOUBLE NOT NULL,
    `preco_venda` DOUBLE NOT NULL,
    `quantidade_estoque` INTEGER NOT NULL,
    `estoque_minimo` INTEGER NOT NULL,

    PRIMARY KEY (`id_disco`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Movimentacao_Estoque` (
    `id_movimentacao` INTEGER NOT NULL AUTO_INCREMENT,
    `id_disco` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `tipo_movimentacao` ENUM('entrada', 'saida') NOT NULL DEFAULT 'saida',
    `quantidade` INTEGER NOT NULL,
    `data_movimentacao` DATE NOT NULL,
    `observacao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_movimentacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Movimentacao_Estoque` ADD CONSTRAINT `Movimentacao_Estoque_id_disco_fkey` FOREIGN KEY (`id_disco`) REFERENCES `Disco`(`id_disco`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movimentacao_Estoque` ADD CONSTRAINT `Movimentacao_Estoque_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
