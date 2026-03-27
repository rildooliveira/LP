<?php
/**
 * Endpoint: Leitura de Invenções (READ)
 * Retorna todos os projetos cadastrados ordenados do mais recente para o mais antigo.
 */
header('Content-Type: application/json');
require_once 'db_connect.php';

try {
    $sql = "SELECT id, nome_projeto, categoria, custo_estimado, esta_finalizado FROM invencoes ORDER BY id DESC";
    $resultado = $conexao->query($sql);
    
    if (!$resultado) throw new Exception("Erro ao processar a leitura dos dados.");
    
    echo json_encode($resultado->fetch_all(MYSQLI_ASSOC));
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["erro" => $e->getMessage()]);
}
?>
