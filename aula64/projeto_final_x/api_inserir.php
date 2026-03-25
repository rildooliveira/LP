<?php
header('Content-Type: application/json');
require_once 'db_connect.php'; 

try {
    /* * 🐛 BUG 3 RESOLVIDO (Atividade 3: var_dump e Payload):
     * O PHP devolvia erro de "Nome Obrigatório".
     * Usamos var_dump($_POST) e vimos na aba Network (Response) que o HTML
     * envia a chave 'nome_projeto', não 'nome'. O PHP não encontrava os dados.
     */
    // ORIGINAL (com erro): $nome = $_POST['nome'] ?? '';
    $nome = $_POST['nome_projeto'] ?? ''; // CORRIGIDO
    
    $categoria = $_POST['categoria'] ?? '';
    $custo = $_POST['custo_estimado'] ?? 0;

    if(empty($nome) || empty($categoria)) {
        throw new Exception("O Nome e a Categoria são obrigatórios!");
    }

    $sql = "INSERT INTO invencoes (nome_projeto, categoria, custo_estimado) 
            VALUES ('$nome', '$categoria', '$custo')";

    if ($conexao->query($sql) === TRUE) {
        echo json_encode(["sucesso" => "Invenção cadastrada com sucesso!"]);
    } else {
        throw new Exception("Erro de Banco de Dados: " . $conexao->error);
    }

} catch (Exception $erro) {
    http_response_code(400); 
    echo json_encode(["erro" => $erro->getMessage()]);
}
?>
