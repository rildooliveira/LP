<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Índice de Aulas - LP</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f2f5; margin: 0; padding: 40px; }
        .list-container { max-width: 700px; margin: auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        h1 { color: #1a73e8; border-bottom: 2px solid #e8f0fe; padding-bottom: 10px; }
        .aula-link { display: flex; align-items: center; padding: 12px; margin: 8px 0; background: #f8f9fa; border-radius: 6px; text-decoration: none; color: #333; transition: 0.2s; border: 1px solid #eee; }
        .aula-link:hover { background: #e8f0fe; transform: translateX(5px); border-color: #1a73e8; }
        .icon { font-size: 1.2rem; margin-right: 15px; }
    </style>
</head>
<body>

<div class="list-container">
    <h1>🚀 Aulas de Linguagem de Programação</h1>
    <div class="links">
        <?php
        $path = ".";
        $diretorios = array_filter(glob($path . '/*'), 'is_dir');

        if (empty($diretorios)) {
            echo "<p>Nenhuma pasta de aula encontrada.</p>";
        }

        foreach ($diretorios as $pasta) {
            // Remove o './' do nome da pasta para exibir o link limpo
            $nomePasta = basename($pasta);
            echo "<a href='$nomePasta/' class='aula-link'>
                    <span class='icon'>📂</span>
                    <span>$nomePasta</span>
                  </a>";
        }
        ?>
    </div>
</div>

</body>
</html>