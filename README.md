# Athenas-Test

# Tecnologias utilizadas:
Back-end:
- NodeJs
- Express
- Sequelize
- PostgreSQL

Front-end:
- VueJS
- BootStrap
- DevExpress
- Axios

<br>
### 🏃 Rodando o projeto...
<br>

# ----- BACK END -----

É necessário instalar o PostgreSQL em sua máquina e configurá-lo. Após, dentro do diretório "back-end" desta aplicação, acesse "src/config/database.js" e altere de acordo com as configurações do seu banco de dados.

Acesse o diretório "back-end" e no terminal, execute os comandos:

Se você já tem o yarn instalado, execute:

- yarn install
- yarn sequelize db:create (criando banco de dados)
- yarn sequelize db:migrate (criando tabela)

- yarn dev

A outra opção é utlizar o npm:

- npm install
- npx sequelize db:create (criando banco de dados)
- npx sequelize db:migrate (criando tabela)

npm run dev



# ----- FRONT END -----
acesse o diretório "front-end" e execute os comandos:

Se você já tem o yarn instalado, execute:

- yarn install
- yarn dev

A outra opção é utlizar o npm:

- npm install
- npm run dev
