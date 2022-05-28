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
- O serviço de atualização dos usuários é ativado assim que o servidor sobe
- Depois disso, o serviço roda a cada 5 minutos (todos os dias)

##

### Rotas de api

Base URL: `http://localhost:4000`

##

**Lista de usuários**:

Método: `GET`

Endpoint: `/api/v1/users`

Exemplo de resposta:

```
[
  {
    _id:	String
    fullName:	String
    email:	String
    address:	String
    addressNumber:	Number
    phoneNumber:	String
  }
]
```

##

### Gerenciamento de arquivos
##

**Criar pasta**:

Método: `POST`

Endpoint: `/api/v1/createFolder`

Payload:

```
{
  "name": "Nome_da_pasta"
}
```

Exemplo de resposta:

```
{
  message: String
}
```

##


**Listar pastas**:

Método: `GET`

Endpoint: `/api/v1/folders`

Exemplo de resposta:

```
[
  {
    _id:	String
    folderId:	String
    name:	String
  }
]
```

##


**Upload de arquivos**:

Método: `POST`

Endpoint: `/api/v1/uploadFile`

Form-data:

```
folderName: "Nome_da_pasta"
file: Algum_arquivo
```

##


**Listagem de arquivos**:

Método: `GET`

Endpoint: `/api/v1/files`

Exemplo de resposta:

```
[
  {
    _id:	String
    folderParentId:	String
    fileId:	String
    name:	String
  }
]
```

##
