# Mapa Tech Mundial

Um sistema interativo para explorar países do mundo, consumindo dados da API [REST Countries](https://restcountries.com/).

## Como Rodar o Projeto

1. **Instalar Dependências**
   ```bash
   npm install
   ```

2. **Configurar Banco de Dados**
   - Crie um banco de dados MySQL chamado `mapa_tech`.
   - Execute os comandos SQL presentes no arquivo `database.sql`.

3. **Configurar Ambiente**
   - Renomeie o arquivo `.env.example` para `.env` (ou use o `.env` já criado).
   - Ajuste as credenciais do seu banco de Dados (`DB_USER`, `DB_PASS`).

4. **Iniciar o Servidor**
   ```bash
   npm start
   ```
   Acesse: `http://localhost:3000`

## Tecnologias Utilizadas
- **Node.js & Express**: Servidor e rotas.
- **MySQL**: Banco de dados para usuários e favoritos.
- **EJS**: Template engine para o front-end.
- **Axios**: Consumo de API externa.
- **CSS Moderno**: Flexbox, Grid e Glassmorphism.

## Estrutura do Projeto
- `controllers/`: Lógica de negócio e tratamento de dados.
- `models/`: Interação com o banco de dados.
- `routes/`: Definição dos caminhos (URLs).
- `views/`: Telas da aplicação em EJS.
- `public/`: Arquivos estáticos (CSS).
