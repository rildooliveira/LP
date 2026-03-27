<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

try {
    $id = $_GET['id'] ?? 0;
    if ($id <= 0) throw new Exception("ID inválido.");

    $sql = "UPDATE invencoes SET esta_finalizado = NOT esta_finalizado WHERE id = $id";
    if ($conexao->query($sql) === TRUE) echo json_encode(["sucesso" => "Status alterado!"]);
    else throw new Exception("Erro ao atualizar.");
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(["erro" => $e->getMessage()]);
}
?>
