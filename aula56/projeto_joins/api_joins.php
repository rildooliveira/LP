<?php
header('Content-Type: application/json');

$host = 'localhost';
$user = 'root';
$pass = '';
$db   = 'db_loja_nova'; // O nome do seu novo banco de dados

try {
    $conexao = new mysqli($host, $user, $pass, $db);

    if ($conexao->connect_error) {
        throw new Exception("Falha na conexão com o banco de dados.");
    }

    $tipo = $_GET['tipo'] ?? 'inner';
    
    // A mágica da projeção com aliases
    $baseQuery = "SELECT p.nome AS produto_nome, p.preco, c.nome AS categoria_nome 
                  FROM produtos p ";

    if ($tipo === 'left') {
        $sql = $baseQuery . "LEFT JOIN categorias c ON p.categoria_id = c.id ORDER BY p.nome ASC";
    } else {
        $sql = $baseQuery . "INNER JOIN categorias c ON p.categoria_id = c.id ORDER BY p.nome ASC";
    }

    $resultado = $conexao->query($sql);
    
    if (!$resultado) throw new Exception("Erro de SQL: " . $conexao->error);

    $dados = [];
    while($linha = $resultado->fetch_assoc()) {
        $dados[] = $linha;
    }

    echo json_encode($dados);

} catch (Exception $e) {
    echo json_encode(["erro" => $e->getMessage()]);
}
?>
