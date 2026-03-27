<?php
/**
 * Endpoint: Exclusão de Invenções (DELETE)
 * Remove permanentemente um registro do banco de dados.
 */
header('Content-Type: application/json');
require_once 'db_connect.php';

try {
    $id = intval($_GET['id'] ?? 0);
    if ($id <= 0) throw new Exception("Identificador de projeto inválido para exclusão.");

    $sql = "DELETE FROM invencoes WHERE id = $id";
    
    if ($conexao->query($sql) === TRUE) {
        echo json_encode(["sucesso" => "Projeto removido do acervo."]);
    } else {
        throw new Exception("Falha ao tentar excluir o registro.");
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(["erro" => $e->getMessage()]);
}
?>
