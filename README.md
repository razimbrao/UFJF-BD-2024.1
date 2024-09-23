# UFJF-BD-2024.1
## Requisitos

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas:

- **Node.js**
- **npm**
- **PostgreSQL**

## Passos para configuração inicial

Siga os passos abaixo para configurar o projeto:

### 2. Instalar dependências
Execute o comando abaixo para instalar todas as dependências do projeto:

```
npm install
```
### 3. Configuração do .env

Necessário criar um arquivo .env para configurar as variáveis de ambiente, seguindo o modelo do arquivo .env.example.

### 4. rodar as Migrations

```
npm run db:migrate
```

### 5. rodar a aplicação

```
npm run start:dev
```