<?php
// Configurações de conexão
$host = "localhost";
$user = "root";
$pass = "";
$db   = "db_aula_pratica";

// 1. Tentativa de conexão com supressor de erros para controle manual
$conexao = @new mysqli($host, $user, $pass, $db);

$response = [];

// 2. VALIDAÇÃO DA CONEXÃO (A falha estava aqui)
if ($conexao->connect_error) {
    header('Content-Type: application/json');
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Falha na conexão com o banco: " . $conexao->connect_error
    ]);
    exit; // Interrompe a execução se não houver conexão
}

// 3. Execução do comando DDL
$sql = "CREATE TABLE IF NOT EXISTS produtos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    estoque INT DEFAULT 0,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;"; // Adicionado motor explicitamente

if ($conexao->query($sql) === TRUE) {
    $response["status"] = "sucesso";
    $response["mensagem"] = "Estrutura DDL processada com sucesso!";
} else {
    $response["status"] = "erro";
    $response["mensagem"] = "Erro ao criar tabela: " . $conexao->error;
}

// 4. Fechamento da conexão e saída
$conexao->close();
header('Content-Type: application/json');
echo json_encode($response);
?>