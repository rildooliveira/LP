# ⚙️ Mestres da Invenção - Gestor de Projetos

Sistema Web (Single Page Application) desenvolvido para o gerenciamento de cartas e projetos de inovação. O sistema permite o cadastro, leitura, atualização de status e exclusão de invenções de forma assíncrona, garantindo uma experiência de usuário fluida.

## 🚀 Tecnologias Utilizadas
* **Front-end:** HTML5, CSS3, JavaScript (Fetch API, ES6+).
* **Back-end:** PHP 8 (Modularizado, Early Return, Padrão RESTful).
* **Banco de Dados:** MySQL (Consultas otimizadas).
* **Arquitetura:** Clean Code, Responsabilidade Única (SRP) e Fail Fast.

## 📦 Como Instalar e Rodar o Projeto
1. Clone este repositório na pasta `www` (WAMP) ou `htdocs` (XAMPP).
2. Acesse o `phpMyAdmin` e execute o script contido no arquivo `banco_de_dados.sql` para criar as tabelas.
3. Configure as credenciais de acesso no arquivo `db_connect.php` (se necessário).
4. Acesse o projeto no navegador: `http://localhost/seu-diretorio`.

## 🔒 Boas Práticas Implementadas
* **Prevenção de SQL Injection:** Uso de validações rigorosas no Back-end.
* **UX/UI:** Feedbacks visuais em tempo real, botões de carregamento e confirmação de exclusão segura.
* **Refatoração:** Código livre de "Números Mágicos" e "Arrow Code" (ifs aninhados).
