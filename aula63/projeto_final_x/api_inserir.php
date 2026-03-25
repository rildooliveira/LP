<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

try {
    // [ATIVIDADE 3] Recebendo dados via FormData do JavaScript
    $nome      = $_POST['nome_projeto'] ?? '';
    $categoria = $_POST['categoria'] ?? '';
    $custo     = $_POST['custo_estimado'] ?? 0;

    // [ATIVIDADE 6] Validação de segurança no PHP
    if (empty($nome) || empty($categoria)) {
        throw new Exception("Nome e Categoria são obrigatórios no servidor.");
    }

    $sql = "INSERT INTO invencoes (nome_projeto, categoria, custo_estimado) VALUES (?, ?, ?)";
    $stmt = $conexao->prepare($sql);
    $stmt->bind_param("ssd", $nome, $categoria, $custo);

    if ($stmt->execute()) {
        echo json_encode(["sucesso" => "Invenção cadastrada com sucesso!"]);
    } else {
        throw new Exception("Erro ao salvar no banco: " . $conexao->error);
    }

} catch (Exception $e) {
    echo json_encode(["erro" => $e->getMessage()]);
}
?>
