<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "db_loja_nova");

$termo = $_GET['busca'] ?? '';

// SQL dinâmico com filtro LIKE e ordenação por nome
$sql = "SELECT * FROM produtos WHERE nome LIKE '%$termo%' ORDER BY nome ASC";

$res = $conn->query($sql);
$produtos = [];
while($linha = $res->fetch_assoc()) { $produtos[] = $linha; }

echo json_encode($produtos);
$conn->close();
?>
