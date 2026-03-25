<?php
// db_connect.php (Responsabilidade Única: Apenas conectar ao banco)

$configuracaoBanco = [
    'host' => 'localhost',
    'user' => 'root',
    'pass' => '',
    'db'   => 'db_inventores'
];

$conexao = new mysqli(
    $configuracaoBanco['host'], 
    $configuracaoBanco['user'], 
    $configuracaoBanco['pass'], 
    $configuracaoBanco['db']
);

if ($conexao->connect_error) {
    // ATIVIDADE 1: Nome de variável significativo ($mensagemErro em vez de $e)
    $mensagemErro = "Erro fatal na conexão: " . $conexao->connect_error;
    die($mensagemErro);
}
?>
