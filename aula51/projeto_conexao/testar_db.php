<?php
// Configurações de acesso
$host = "localhost";
$user = "root";
$pass = "";

// Tentar conectar
$conexao = new mysqli($host, $user, $pass);

$response = [];

if ($conexao->connect_error) {
    $response["status"] = "erro";
    $response["mensagem"] = "Conexão Recusada: " . $conexao->connect_error;
} else {
    $response["status"] = "sucesso";
    $response["mensagem"] = "MySQL Conectado e Ativo!";
}

// Retornar o resultado para o JavaScript em formato JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
