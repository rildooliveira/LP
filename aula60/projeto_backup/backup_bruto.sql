-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 23/03/2026 às 20:39
-- Versão do servidor: 8.3.0
-- Versão do PHP: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `db_aula_pratica`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `categorias`
--

DROP TABLE IF EXISTS `categorias`;
CREATE TABLE IF NOT EXISTS `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `categorias`
--

INSERT INTO `categorias` (`id`, `nome`) VALUES
(1, 'Hardware'),
(2, 'Periféricos'),
(3, 'Software'),
(4, 'Redes'),
(5, 'Serviços');

-- --------------------------------------------------------

--
-- Estrutura para tabela `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `data_registro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `clientes`
--

INSERT INTO `clientes` (`id`, `nome`, `email`, `data_registro`) VALUES
(1, 'Novo Aluno', 'aluno@provedor.com', '2026-03-19 17:32:47');

-- --------------------------------------------------------

--
-- Estrutura para tabela `fornecedores`
--

DROP TABLE IF EXISTS `fornecedores`;
CREATE TABLE IF NOT EXISTS `fornecedores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `razao_social` varchar(150) NOT NULL,
  `cnpj` varchar(20) NOT NULL,
  `status` varchar(20) DEFAULT 'Ativo',
  PRIMARY KEY (`id`),
  UNIQUE KEY `cnpj` (`cnpj`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `itens`
--

DROP TABLE IF EXISTS `itens`;
CREATE TABLE IF NOT EXISTS `itens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `id_categoria` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_categoria` (`id_categoria`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `itens`
--

INSERT INTO `itens` (`id`, `nome`, `id_categoria`) VALUES
(1, 'Teclado Gamer', 999),
(2, 'SSD 1TB NVMe', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos`
--

DROP TABLE IF EXISTS `produtos`;
CREATE TABLE IF NOT EXISTS `produtos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `estoque` int NOT NULL,
  `categoria_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_categoria_link` (`categoria_id`),
  KEY `idx_nome` (`nome`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `produtos`
--

INSERT INTO `produtos` (`id`, `nome`, `preco`, `estoque`, `categoria_id`) VALUES
(1, 'Placa Mãe Asus X570', 1250.00, 15, 1),
(2, 'Processador Ryzen 7', 1800.50, 10, 1),
(3, 'Memória RAM 16GB', 350.00, 30, 1),
(4, 'Mouse Gamer Sem Fio', 220.00, 45, 2),
(5, 'Teclado Mecânico', 380.00, 20, 2),
(6, 'Windows 11 Pro', 850.00, 100, 3),
(7, 'Antivírus 1 Ano', 120.00, 50, 3),
(8, 'Roteador Wi-Fi 6', 450.00, 5, 4),
(9, 'Cabo de Rede 10m', 45.00, 3, 4);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `v_lista_produtos`
-- (Veja abaixo para a visão atual)
--
DROP VIEW IF EXISTS `v_lista_produtos`;
CREATE TABLE IF NOT EXISTS `v_lista_produtos` (
`id` int
,`produto` varchar(100)
,`categoria` varchar(50)
,`preco` decimal(10,2)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `v_produtos_esgotados`
-- (Veja abaixo para a visão atual)
--
DROP VIEW IF EXISTS `v_produtos_esgotados`;
CREATE TABLE IF NOT EXISTS `v_produtos_esgotados` (
`id` int
,`produto` varchar(100)
,`setor` varchar(50)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `v_resumo_categorias`
-- (Veja abaixo para a visão atual)
--
DROP VIEW IF EXISTS `v_resumo_categorias`;
CREATE TABLE IF NOT EXISTS `v_resumo_categorias` (
`categoria_id` int
,`total_itens` bigint
,`media_valor` decimal(14,6)
);

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `v_tabela_precos_margem`
-- (Veja abaixo para a visão atual)
--
DROP VIEW IF EXISTS `v_tabela_precos_margem`;
CREATE TABLE IF NOT EXISTS `v_tabela_precos_margem` (
`produto` varchar(100)
,`custo_base` decimal(10,2)
,`preco_venda_sugerido` decimal(13,4)
);

-- --------------------------------------------------------

--
-- Estrutura para view `v_lista_produtos`
--
DROP TABLE IF EXISTS `v_lista_produtos`;

DROP VIEW IF EXISTS `v_lista_produtos`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_lista_produtos`  AS SELECT `p`.`id` AS `id`, `p`.`nome` AS `produto`, `c`.`nome` AS `categoria`, `p`.`preco` AS `preco` FROM (`produtos` `p` join `categorias` `c` on((`p`.`categoria_id` = `c`.`id`))) ;

-- --------------------------------------------------------

--
-- Estrutura para view `v_produtos_esgotados`
--
DROP TABLE IF EXISTS `v_produtos_esgotados`;

DROP VIEW IF EXISTS `v_produtos_esgotados`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_produtos_esgotados`  AS SELECT `p`.`id` AS `id`, `p`.`nome` AS `produto`, `c`.`nome` AS `setor` FROM (`produtos` `p` join `categorias` `c` on((`p`.`categoria_id` = `c`.`id`))) WHERE (`p`.`estoque` = 0) ;

-- --------------------------------------------------------

--
-- Estrutura para view `v_resumo_categorias`
--
DROP TABLE IF EXISTS `v_resumo_categorias`;

DROP VIEW IF EXISTS `v_resumo_categorias`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_resumo_categorias`  AS SELECT `produtos`.`categoria_id` AS `categoria_id`, count(0) AS `total_itens`, avg(`produtos`.`preco`) AS `media_valor` FROM `produtos` GROUP BY `produtos`.`categoria_id` ;

-- --------------------------------------------------------

--
-- Estrutura para view `v_tabela_precos_margem`
--
DROP TABLE IF EXISTS `v_tabela_precos_margem`;

DROP VIEW IF EXISTS `v_tabela_precos_margem`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `v_tabela_precos_margem`  AS SELECT `produtos`.`nome` AS `produto`, `produtos`.`preco` AS `custo_base`, (`produtos`.`preco` * 1.30) AS `preco_venda_sugerido` FROM `produtos` ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
