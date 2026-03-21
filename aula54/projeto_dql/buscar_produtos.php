<?php
header('Content-Type: application/json');
$host = "localhost";
$user = "root";
$pass = "";
$db   = "db_aula_pratica"; // Banco criado na Aula 51

// Conectando já selecionando o banco
$conexao = new mysqli($host, $user, $pass, $db);


$termo = $_GET['busca'] ?? '';

// SQL dinâmico com filtro LIKE e ordenação por nome
//$sql = "SELECT * FROM produtos WHERE nome LIKE '%$termo%' ORDER BY nome ASC";
$sql = "SELECT * FROM produtos WHERE preco BETWEEN 50 AND 500";

$res = $conexao->query($sql);
$produtos = [];
while($linha = $res->fetch_assoc()) { $produtos[] = $linha; }

echo json_encode($produtos);
$conexao->close();
?>
