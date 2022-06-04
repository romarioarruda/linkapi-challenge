### Serviço de automação e gerenciamento de arquivos

##

**Funcionamento**:

- Aplicação disponível em http://localhost:4000
- O serviço consome uma api de usuário de terceiros
- O serviço que atualiza os usuários é ativado assim que o servidor sobe
- Depois disso, o serviço roda a cada 5 minutos (todos os dias)
- O serviço gerencia arquivos no GoFile API (https://gofile.io/)


##

**Requisitos para rodar a aplicação**:

- Renomeie o arquivo `.env.example` para `.env`
- Docker e Docker-compose instalados

##

**Rodando a aplicação**:

```
$ docker-compose up -d
```

**Para ver os logs no docker**

```
$ docker-compose logs -f
```

##

**Containers**:

- Um container estará rodando a aplicação `(porta 4000)`

##


### Requisitos para commitar alterações/atualizações:

**Atualizando dependências**:

```
$ npm install

$ npm run prepare
```

**Gerando novo commit**:

No Linux/Mac
```
$ git commit
```

No Windows

```
$ git cz
```

Será listado alguns tipos de commit.

Complete os passos que aparecerem.

##


**Links de referências**:

- https://github.com/commitizen/cz-cli

- https://typicode.github.io/husky/#/


##


### Rotas de api

Base URL: `http://localhost:4000`

##

**Listar usuários**:

Método: `GET`

Endpoint: `/api/v1/users?page=1`

Limite: `10 itens por página`

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

Endpoint: `/api/v1/folders`

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

Endpoint: `/api/v1/folders?page=1`

Limite: `10 itens por página`

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

Endpoint: `/api/v1/files`

Form-data:

```
folderName: "Nome_da_pasta"
file: Algum_arquivo
```

##


**Listagem de arquivos**:

Método: `GET`

Endpoint: `/api/v1/files?page=1`

Limite: `10 itens por página`

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
