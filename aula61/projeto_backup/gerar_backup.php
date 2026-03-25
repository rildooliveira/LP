<?php
header('Content-Type: application/json');

// Configurações do Banco da Aula Prática
$host = 'localhost';
$user = 'root';
$pass = ''; // WAMP por padrão não tem senha no root
$db   = 'db_aula_pratica';

// Gera um nome de arquivo dinâmico com Data e Hora
$dataAtual = date('Y-m-d_H-i-s');
$arquivo_destino = "backup_{$db}_{$dataAtual}.sql";

/* IMPORTANTE: O comando abaixo assume que o 'mysqldump' está configurado 
 nas Variáveis de Ambiente do Windows. 
 Se falhar, você pode precisar colocar o caminho completo do WAMP, como:
 $comando = "C:\\wamp64\\bin\\mysql\\mysql8.0.27\\bin\\mysqldump -u {$user} {$db} > {$arquivo_destino}";
*/

$comando = "mysqldump -u {$user} {$db} > {$arquivo_destino}";

// Executa o comando no terminal do sistema operacional
exec($comando, $output, $resultado_codigo);

// Se o código de resultado for 0, o Windows executou o comando com sucesso
if ($resultado_codigo === 0) {
    echo json_encode([
        "status" => "sucesso",
        "arquivo" => $arquivo_destino
    ]);
} else {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "O MySQLDump não foi reconhecido. Verifique o caminho (PATH) no WAMP."
    ]);
}
?>
