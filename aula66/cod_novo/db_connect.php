<?php
/**
 * Módulo de Conexão com o Banco de Dados
 * Centraliza as credenciais para facilitar manutenções futuras.
 */
$host = 'localhost';
$user = 'root';
$pass = '';
$db   = 'db_inventores';

try {
    $conexao = new mysqli($host, $user, $pass, $db);
    $conexao->set_charset("utf8mb4");

    if ($conexao->connect_error) {
        throw new Exception("Falha crítica de comunicação com o banco de dados.");
    }
} catch (Exception $e) {
    header('Content-Type: application/json');
    http_response_code(500);
    die(json_encode(["erro" => $e->getMessage()]));
}
?>
