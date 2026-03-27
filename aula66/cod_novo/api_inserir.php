<?php
/**
 * Endpoint: Cadastro de Invenções (CREATE)
 * Utiliza Early Return para validação de regras de negócio antes da inserção.
 */
header('Content-Type: application/json');
require_once 'db_connect.php';

const CUSTO_MAXIMO = 99999;

try {
    $nome = trim($_POST['nome_projeto'] ?? '');
    $categoria = trim($_POST['categoria'] ?? '');
    $custo = floatval($_POST['custo_estimado'] ?? 0);

    // Validações Fail Fast (Early Return)
    if (empty($nome)) throw new Exception("O nome do projeto é obrigatório.");
    if (empty($categoria)) throw new Exception("A categoria do projeto é obrigatória.");
    if ($custo <= 0 || $custo > CUSTO_MAXIMO) throw new Exception("O custo deve ser entre R$ 0,01 e R$ " . number_format(CUSTO_MAXIMO, 2, ',', '.') . ".");

    // Sanitização básica contra quebra de strings SQL
    $nome_seguro = $conexao->real_escape_string($nome);
    $categoria_segura = $conexao->real_escape_string($categoria);

    $sql = "INSERT INTO invencoes (nome_projeto, categoria, custo_estimado) VALUES ('$nome_seguro', '$categoria_segura', '$custo')";
    
    if ($conexao->query($sql) === TRUE) {
        http_response_code(201); // 201 Created
        echo json_encode(["sucesso" => "Invenção '$nome_seguro' cadastrada com sucesso!"]);
    } else {
        throw new Exception("Falha interna ao registrar a invenção.");
    }
} catch (Exception $erro) {
    http_response_code(400); // 400 Bad Request
    echo json_encode(["erro" => $erro->getMessage()]);
}
?>
