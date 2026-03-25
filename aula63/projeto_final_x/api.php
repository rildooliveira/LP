<?php
header('Content-Type: application/json');

/* CÓDIGO REMOVIDO (ATIVIDADE 2 - Extração de Lógica):
$configuracaoBanco = [...];
$conexao = new mysqli(...);
if ($conexao->connect_error) { ... }
*/

// [ATIVIDADE 2] Importando a conexão modular
require_once 'db_connect.php';

try {
    // [ATIVIDADE 1] Renomeando variáveis para nomes significativos
    // Original: $sqlConsulta = "SELECT * FROM invencoes...";
    $querySelecaoProjetos = "SELECT * FROM invencoes ORDER BY id DESC";
    $resultadoBruto = $conexao->query($querySelecaoProjetos);

    if (!$resultadoBruto) {
        throw new Exception("Falha na consulta: " . $conexao->error);
    }

    $listaDeInvencoes = $resultadoBruto->fetch_all(MYSQLI_ASSOC);

    echo json_encode($listaDeInvencoes);

} catch (Exception $erroCapturado) {
    http_response_code(500);
    echo json_encode(["erro" => $erroCapturado->getMessage()]);
}
?>
