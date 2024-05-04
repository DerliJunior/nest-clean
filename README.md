## Installation
- Para instalarmos as dependências do projeto, precisamos abrir o terminal no diretório "/nest-clean" e rodar o comando npm install

```bash
$ npm install
```

## Variáveis de ambiente

- Crie um arquivo .env na raiz do projeto e utilize como exemplo o arquivo .example.env

```bash
# VARIAVEIS PARA O DOCKER COMPOSE E O PRISMA
DB_USER=<USUARIO>
DB_PASSWORD=<SENHA>
DB_NAME=<NOME_BANCO>
DB_PORT=<PORTA>
DATABASE_URL=postgres://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}

# VARIAVEIS PARA O APP NEST
APP_PORT=3333
```

## Gerando container do banco de dados Postgres
- Abra o terminal no root do projeto e rode o comando para criar o container e rodar seu docker
```bash
# Abra o terminal no root do projeto e rode o comando para criar o container e rodar seu docker
# Obs: por padrão a porta do postgres é 5432
$ docker-compose up -d

```

## Gerando as migrations do prisma

## Inicializando o App

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support
