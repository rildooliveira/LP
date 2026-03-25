<?php
header('Content-Type: application/json');
require_once 'db.php'; 

try {
    // 🐛 BUG 3: Tentando capturar o nome errado do formulário HTML.
    $nome = $_POST['nome'] ?? '';
    $categoria = $_POST['categoria'] ?? '';
    $custo = $_POST['custo_estimado'] ?? 0;

    if(empty($nome) || empty($categoria)) {
        throw new Exception("O Nome e a Categoria são obrigatórios!");
    }

    $sql = "INSERT INTO invencoes (nome_projeto, categoria, custo_estimado) 
            VALUES ('$nome', '$categoria', '$custo')";

    if ($conexao->query($sql) === TRUE) {
        echo json_encode(["sucesso" => "Invenção cadastrada com sucesso!"]);
    } else {
        throw new Exception("Erro de Banco de Dados: " . $conexao->error);
    }

} catch (Exception $erro) {
    http_response_code(400); 
    echo json_encode(["erro" => $erro->getMessage()]);
}
?>
