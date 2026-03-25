<?php
// db_connect.php (Responsabilidade Única: Apenas conectar ao banco)
$conexao = new mysqli('localhost', 'root', '', 'db_inventores');
if ($conexao->connect_error) {
    die("Erro fatal: " . $conexao->connect_error);
}
?>
