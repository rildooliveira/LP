<?php
$conexao = new mysqli("localhost", "root", "", "db_aula_pratica");

// O PHP chama a View como se fosse uma tabela simples
$sql = "SELECT * FROM v_lista_produtos";

$resultado = $conexao->query($sql);
$dados = [];

while($linha = $resultado->fetch_assoc()) {
    $dados[] = $linha;
}

header('Content-Type: application/json');
echo json_encode($dados);
?>
