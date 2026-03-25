<?php
header('Content-Type: application/json');

$host = 'localhost';
$user = 'root';
$pass = '';
$db   = 'db_aula_pratica'; // Nome do banco atualizado!

try {
    $conexao = new mysqli($host, $user, $pass, $db);
    
    if ($conexao->connect_error) {
        throw new Exception("Falha de conexão com o banco de dados.");
    }

    // Recebe os dados do formulário
    $nome = $_POST['nome'] ?? '';
    $categoria_id = $_POST['categoria_id'] ?? '';

    if (empty($nome) || empty($categoria_id)) {
        throw new Exception("Dados incompletos enviados ao servidor.");
    }

    // Prepara a instrução SQL para inserir o produto com a Chave Estrangeira
    $sql = "INSERT INTO produtos (nome, categoria_id) VALUES ('$nome', '$categoria_id')";

    if ($conexao->query($sql) === TRUE) {
        echo json_encode([
            "status" => "sucesso", 
            "mensagem" => "Produto vinculado à categoria com sucesso!"
        ]);
    } else {
        throw new Exception("Erro de restrição FK: " . $conexao->error);
    }

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        "status" => "erro", 
        "mensagem" => $e->getMessage()
    ]);
}
?>