<?php
    // Configurações padrão do WAMP
    $host = "localhost";
    $user = "root";
    $pass = ""; 

    // Criando a conexão com o motor MySQL
    $conexao = new mysqli($host, $user, $pass);

    // Verificando se houve erro de comunicação
    if ($conexao->connect_error) {
        echo "<h1>❌ Status: Erro de Conexão</h1>";
        echo "Causa: " . $conexao->connect_error;
    } else {
        echo "<h1>✅ Status: Servidor MySQL Ativo!</h1>";
        echo "O PHP conseguiu se conectar ao banco de dados com sucesso.";
    }
?>
