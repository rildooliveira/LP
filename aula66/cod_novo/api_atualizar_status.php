<?php
/**
 * Endpoint: Atualização de Status (UPDATE)
 * Inverte o status atual (Concluído <-> Em Andamento) de forma otimizada via SQL puro.
 */
header('Content-Type: application/json');
require_once 'db_connect.php';

try {
    $id = intval($_GET['id'] ?? 0);
    if ($id <= 0) throw new Exception("Identificador de projeto inválido.");

    // O operador NOT inverte o valor booleano nativamente no MySQL
    $sql = "UPDATE invencoes SET esta_finalizado = NOT esta_finalizado WHERE id = $id";
    
    if ($conexao->query($sql) === TRUE) {
        echo json_encode(["sucesso" => "Status do projeto atualizado!"]);
    } else {
        throw new Exception("Erro ao tentar atualizar o status.");
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(["erro" => $e->getMessage()]);
}
?>
