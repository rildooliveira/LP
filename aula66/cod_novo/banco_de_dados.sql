-- Criação do Banco de Dados do Sistema
CREATE DATABASE IF NOT EXISTS db_inventores;
USE db_inventores;

-- Estrutura da Tabela Principal
CREATE TABLE IF NOT EXISTS invencoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_projeto VARCHAR(100) NOT NULL COMMENT 'Nome da carta/invenção',
    categoria VARCHAR(50) NOT NULL COMMENT 'Classificação do projeto',
    custo_estimado DECIMAL(10, 2) NOT NULL COMMENT 'Valor financeiro estimado',
    esta_finalizado BOOLEAN DEFAULT 0 COMMENT '0 = Em Andamento, 1 = Concluído',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
