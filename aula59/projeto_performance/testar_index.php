<?php
$conexao = new mysqli("localhost", "root", "", "db_aula_pratica");
$nome = $_GET['nome'] ?? '';

// 1. Medindo o tempo de execução
$inicio = microtime(true);

// 2. Executando a auditoria (EXPLAIN)
$auditoria = $conexao->query("EXPLAIN SELECT nome FROM produtos WHERE nome = '$nome'")->fetch_assoc();

// 3. Executando a query real
$conexao->query("SELECT nome FROM produtos WHERE nome LIKE '$nome%'");

$fim = microtime(true);
$tempo_total = number_format($fim - $inicio, 6);

header('Content-Type: application/json');
echo json_encode([
    "tempo_execucao" => $tempo_total,
    "analise" => [
        "type" => $auditoria['type'], // ALL, ref, const...
        "rows" => $auditoria['rows']  // Linhas analisadas
    ]
]);
?>
