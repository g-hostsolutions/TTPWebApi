<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript repository.

## Installation

```bash
$ npm i -g @nestjs/cli
$ npm i -g yarn
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test
```

## Instruções de Requests
```bash
  APENAS SE UTILIZA DOS METODOS GET POST PATCH DELETE

  EM TODOS OS POSTS E PATCH DEVERÁ SE ENVIAR UM JSON NO BODY

# Rota de motoristas
  GET http://localhost:8000/drivers

  POST http://localhost:8000/drivers

  PATCH http://localhost:8000/drivers/:id

  DELETE http://localhost:8000/drivers/:id

# Motoristas JSON
  {
    "nome": "Nome do Motorista"
  }  

# Rota de veiculos
  GET http://localhost:8000/vehicles

  POST http://localhost:8000/vehicles

  PATCH http://localhost:8000/vehicles/:id

  DELETE http://localhost:8000/vehicles/:id

# Veiculos JSON
  {
    "placa": "HFS-8805",
    "cor": "azul",
    "marca": "voyagem",
  }  

# Rota de utilização
  GET http://localhost:8000/utilization

  POST http://localhost:8000/utilization

  PATCH http://localhost:8000/utilization/:id

  DELETE http://localhost:8000/utilization/:id

# Utilização JSON
  {
    "dataInicio": "2021-07-04", <=== data nesse formato
    "motorista": "ID do motorista gerado no banco",
    "veiculo": "ID do veículo gerado no banco",
    "motivo": "Foi comprar pão.",
    "dataFinal": "2021-07-08" <=== data nesse formato
  }

# A Rota Patch da utilização é a finalização, portanto só necessita da data final, mas e preciso passar o ID da utilização em questão na rota.
  {
    "dataFinal": "2021-07-08" <=== data nesse formato
  }
  
```
