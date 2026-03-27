# ⚙️ Mestres da Invenção - Gestor CRUD

Um sistema completo de Gestão de Projetos e Cartas desenvolvido com uma arquitetura modularizada, separando as responsabilidades entre Front-end (Vanilla JS) e Back-end (PHP 8 + MySQL).

## 🚀 Funcionalidades
- **Create:** Cadastro dinâmico de novas invenções sem recarregar a página (SPA).
- **Read:** Leitura em tempo real do banco de dados com atualização automática após inserções.
- **Tratamento de Erros:** Sistema blindado contra falhas de conexão com mensagens amigáveis na interface.

## 🛠️ Tecnologias Utilizadas
- **HTML5 & CSS3:** Layout responsivo com CSS Flexbox e Grid.
- **JavaScript (ES6):** Fetch API, Async/Await, manipulação de DOM e JSDoc.
- **PHP 8:** Backend construído como API JSON.
- **MySQL:** Banco de dados relacional.

## ⚙️ Como executar o projeto localmente
1. Certifique-se de ter o [WAMP Server](https://www.wampserver.com/) instalado.
2. Clone ou cole esta pasta dentro de `C:\wamp64\www\LP\projeto_final`.
3. Abra o **phpMyAdmin** (`localhost/phpmyadmin`) e execute o script contido em `schema.sql` para criar as tabelas.
4. Acesse o sistema pelo navegador na URL: `http://localhost/LP/projeto_final`

## 📄 Contrato da API (Endpoints)
| Endpoint | Método | Descrição | Parâmetros Esperados |
| :--- | :--- | :--- | :--- |
| `/api_ler.php` | GET | Retorna a lista de todas as invenções. | Nenhum |
| `/api_inserir.php` | POST | Salva uma nova invenção no banco. | `nome_projeto`, `categoria`, `custo_estimado` |

---
*Desenvolvido por Rildo OLiveira durante a disciplina de Lógica e Programação.*
