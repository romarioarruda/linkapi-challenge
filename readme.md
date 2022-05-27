### Desafio LinkApi

##

**Requisitos para rodar a aplicação**:

- Docker e Docker-compose instalados

##

**Rodando a aplicação**:

```
$ docker-compose up -d
```

##

Containers:

- Um container estará rodando o mongodb `(porta 27017)`
- Um container estará rodando a aplicação `(porta 4000)`

##

**Funcionamente**:

- Acesse a aplicação em http://localhost:4000
- O serviço de atualização dos usuários roda a cada 5 minutos (todos os dias)

##

### Rotas de api

Base URL: `http://localhost:4000`

##

**Lista de usuários**:

MÉTODO: `GET`

ENDPOINT: `/api/v1/users`
