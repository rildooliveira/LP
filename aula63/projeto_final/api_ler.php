<?php
header('Content-Type: application/json');
require_once 'db.php'; 

try {
    $resultado = $conexao->query("SELECT * FROM invencoes ORDER BY id DESC");
    echo json_encode($resultado->fetch_all(MYSQLI_ASSOC));
} catch (Exception $erro) {
    http_response_code(500);
    echo json_encode(["erro" => $erro->getMessage()]);
}
?>
