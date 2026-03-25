<?php
header('Content-Type: application/json');

// [ATIVIDADE 1] Importando a conexão modular (Evita repetição de código)
require_once 'db_connect.php';

try {
    $sql = "SELECT * FROM invencoes ORDER BY id DESC";
    $resultado = $conexao->query($sql);
    
    $dados = $resultado->fetch_all(MYSQLI_ASSOC);
    echo json_encode($dados);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["erro" => $e->getMessage()]);
}
?>
