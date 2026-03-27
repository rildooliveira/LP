<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

// REFATORAÇÃO 1: Fim dos números mágicos. 
//O limite é uma constante clara.
const CUSTO_MAXIMO = 99999;

try {
    $nome = $_POST['nome_projeto'] ?? '';
    $categoria = $_POST['categoria'] ?? '';
    $custo = $_POST['custo_estimado'] ?? 0;

    // REFATORAÇÃO 2: Early Return (Retorno Antecipado). 
    // O código falha primeiro, matando os "elses" e alinhando o código à esquerda.
    if (empty($nome)) throw new Exception("Nome do projeto não pode ficar vazio.");
    if (empty($categoria)) throw new Exception("Categoria não pode ficar vazia.");
    if ($custo < 0 || $custo > CUSTO_MAXIMO) throw new Exception("O custo deve estar entre 0 e " . CUSTO_MAXIMO . " reais.");

    // O Fluxo Principal fica limpo e isolado no final.
    $sql = "INSERT INTO invencoes (nome_projeto, categoria, custo_estimado) VALUES ('$nome', '$categoria', '$custo')";
    
    if ($conexao->query($sql) === TRUE) {
        echo json_encode(["sucesso" => "Invenção cadastrada com sucesso!"]);
    } else {
        throw new Exception("Erro interno no banco de dados.");
    }

} catch (Exception $erro) {
    http_response_code(400);
    echo json_encode(["erro" => $erro->getMessage()]);
}
?>
