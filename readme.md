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

**Upload de arquivos**:

Método: `POST`

Endpoint: `/api/v1/uploadFile`

POST: https://store3.gofile.io/uploadFile

Payload Form-data:

```
folderName: "Nome_da_pasta"
file: Algum_arquvo
```

##

FORM FIELDS:

token: OS13IqWgviSFtmoXFltxXmsetZQ45mbx

folderId: pegar info do banco de dados

FORM FILE:

file

const request = `
    curl -X POST \

     --url 'https://store3.gofile.io/uploadFile' \

     --header 'Content-Type: multipart/form-data'

     --data-raw 'token=${process.env.GOFILE_TOKEN}&folderId=${folderParent}'

     -F file=${filePath}
    `
