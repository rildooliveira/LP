<?php
// Define que a resposta será sempre no formato universal JSON
header('Content-Type: application/json');

// 1. Configurações isoladas em um array (facilita manutenção futura)
/*$configuracaoBanco = [
    'host' => 'localhost',
    'user' => 'root',
    'pass' => '',
    'db'   => 'db_inventores'
];*/
// api.php (Agora fica limpo e focado apenas na consulta)
require_once 'db_connect.php'; // "Importa" a conexão pronta

$resultadoConsulta = $conexao->query("SELECT * FROM invencoes");


try {
    // 2. Tentativa de conexão
    $conexao = new mysqli(
        $configuracaoBanco['host'], 
        $configuracaoBanco['user'], 
        $configuracaoBanco['pass'], 
        $configuracaoBanco['db']
    );

    // Se houver erro técnico, lança uma exceção para cair no Catch
    if ($conexao->connect_error) {
        throw new Exception("Falha na conexão: " . $conexao->connect_error);
    }

    // 3. Consulta (DQL) limpa e direta
    $sqlConsulta = "SELECT * FROM invencoes ORDER BY id DESC";
    $resultado = $conexao->query($sqlConsulta);
    
    // 4. Transformação dos dados
    $listaDeInvencoes = $resultado->fetch_all(MYSQLI_ASSOC);

    // 5. Devolve o sucesso para o JavaScript
    echo json_encode($listaDeInvencoes);

} catch (Exception $erro) {
    // 6. Devolve o erro formatado sem quebrar o sistema
    http_response_code(500); // Código HTTP para erro de servidor
    echo json_encode(["erro" => $erro->getMessage()]);
}
?>
