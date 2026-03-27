<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

try {
    $nome = $_POST['nome_projeto'] ?? '';
    $categoria = $_POST['categoria'] ?? '';
    $custo = $_POST['custo_estimado'] ?? 0;

    // SINTOMA 1: Aninhamento profundo (Arrow Code)
    // SINTOMA 2: Número Mágico (99999) sem explicação
    if ($nome != "") {
        if ($categoria != "") {
            if ($custo >= 0 && $custo <= 99999) {
                
                $sql = "INSERT INTO invencoes (nome_projeto, categoria, custo_estimado) VALUES ('$nome', '$categoria', '$custo')";
                if ($conexao->query($sql) === TRUE) {
                    echo json_encode(["sucesso" => "Invenção cadastrada com sucesso!"]);
                } else {
                    throw new Exception("Erro interno no banco de dados.");
                }

            } else {
                throw new Exception("O custo está fora do limite permitido.");
            }
        } else {
            throw new Exception("Categoria não pode ficar vazia.");
        }
    } else {
        throw new Exception("Nome do projeto não pode ficar vazio.");
    }
} catch (Exception $erro) {
    http_response_code(400);
    echo json_encode(["erro" => $erro->getMessage()]);
}
?>
