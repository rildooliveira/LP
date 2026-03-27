<?php
// db.php - Responsabilidade Única: Conexão
$conexao = new mysqli('localhost', 'root', '', 'db_inventores');
if ($conexao->connect_error) {
    die(json_encode(["erro" => "Falha na conexão: " . $conexao->connect_error]));
}
?>
