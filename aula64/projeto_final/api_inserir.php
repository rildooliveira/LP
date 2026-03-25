<?php
/**
 * @file api_inserir.php
 * @description Módulo de API (Create) - Recebe dados via POST e insere no MySQL.
 * @method POST
 * @param string $_POST['nome_projeto'] Nome da carta/projeto (Obrigatório)
 * @param string $_POST['categoria'] Setor do projeto (Obrigatório)
 * @param float $_POST['custo_estimado'] Valor planejado
 * @returns {JSON} Retorna uma mensagem de sucesso ou uma exceção de erro estruturada.
 */

header('Content-Type: application/json');
require_once 'db_connect.php';

try {
    $nome = $_POST['nome_projeto'] ?? '';
    $categoria = $_POST['categoria'] ?? '';
    $custo = $_POST['custo_estimado'] ?? 0;

    // Validação estrita de negócio
    if(empty($nome) || empty($categoria)) {
        throw new Exception("O Nome e a Categoria são obrigatórios para o cadastro!");
    }

    $sql = "INSERT INTO invencoes (nome_projeto, categoria, custo_estimado) 
            VALUES ('$nome', '$categoria', '$custo')";

    if ($conexao->query($sql) === TRUE) {
        echo json_encode(["sucesso" => "Invenção cadastrada com sucesso!"]);
    } else {
        throw new Exception("Erro interno de Banco de Dados: " . $conexao->error);
    }

} catch (Exception $erro) {
    http_response_code(400); // 400 = Bad Request (Erro do cliente)
    echo json_encode(["erro" => $erro->getMessage()]);
}
?>
