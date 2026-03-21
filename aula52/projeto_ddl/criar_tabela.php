<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "db_estudos_sql"; // Banco criado na Aula 51

// Conectando já selecionando o banco
$conexao = new mysqli($host, $user, $pass, $db);

$response = [];

// SQL DDL: Definindo a estrutura da tabela
$sql = "CREATE TABLE IF NOT EXISTS produtos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT DEFAULT 0,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conexao->query($sql) === TRUE) {
    $response["status"] = "sucesso";
    $response["mensagem"] = "Tabela 'produtos' criada (ou já existente)!";
} else {
    
    $response["status"] = "erro";
    $response["mensagem"] = $conexao->error;
}

header('Content-Type: application/json');
echo json_encode($response);
?>
