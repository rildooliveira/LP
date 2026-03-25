<?php
$conexao = new mysqli("localhost", "root", "", "db_aula_pratica");

$tipo = $_GET['tipo'] ?? 'base';
$valor = $_GET['valor'] ?? '';

// Previne erro de sintaxe se o valor vier vazio
if(empty($valor)) { $valor = 0; } 

// 1. Monta a Query baseada na Atividade escolhida no HTML
switch ($tipo) {
    case 'atv4':
        // Filtro numérico (Requer índice em 'preco')
        $sql = "SELECT * FROM produtos WHERE preco > " . (float)$valor;
        break;
        
    case 'atv5_prefixo':
        // Funciona bem com Índice
        $sql = "SELECT * FROM produtos WHERE nome LIKE '$valor%'";
        break;
        
    case 'atv5_sufixo':
        // Quebra o Índice (Gerará ALL)
        $sql = "SELECT * FROM produtos WHERE nome LIKE '%$valor'";
        break;
        
    case 'atv6':
        // JOIN puro filtrando por nome (Requer índice na FK categoria_id)
        $sql = "SELECT p.nome, c.nome as cat_nome FROM produtos p INNER JOIN categorias c ON p.categoria_id = c.id WHERE p.nome = '$valor'";
        break;
        
    case 'atv7':
        // Índice Composto (Categoria + Preço)
        $sql = "SELECT * FROM produtos WHERE categoria_id = 1 AND preco > " . (float)$valor;
        break;
        
    case 'atv8':
        // Index Only Scan (O SELECT * foi trocado apenas pela coluna indexada)
        $sql = "SELECT nome FROM produtos WHERE nome = '$valor'";
        break;
        
    case 'atv9':
        // Baixa Cardinalidade (Retorna ALL mesmo com índice criado)
        $sql = "SELECT * FROM produtos WHERE ativo = " . (int)$valor;
        break;
        
    default:
        // Base / Atividades 1 a 3
        $sql = "SELECT * FROM produtos WHERE nome = '$valor'";
        break;
}

// 2. Medindo o tempo exato de execução da query real
$inicio = microtime(true);
$conexao->query($sql);
$fim = microtime(true);
$tempo_total = number_format($fim - $inicio, 6);

// 3. Executando a auditoria para pegar os dados do plano de execução
// O fetch_assoc pega a primeira linha (tabela principal analisada)
$auditoria = $conexao->query("EXPLAIN " . $sql)->fetch_assoc();

header('Content-Type: application/json');
echo json_encode([
    "tempo_execucao" => $tempo_total,
    "query_testada" => $sql,
    "analise" => [
        "type" => $auditoria['type'] ?? 'ALL', // ALL, ref, range, const...
        "rows" => $auditoria['rows'] ?? 0      // Quantas linhas foram escaneadas
    ]
]);
?>
