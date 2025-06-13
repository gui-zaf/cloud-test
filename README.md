# Cloud-Test API

REST API em Node.js + Express para gerenciar produtos.

## Índice
1. Requisitos
2. Configuração do projeto
3. Configuração do banco de dados MySQL
4. Variáveis de ambiente (`.env`)
5. Execução em modo desenvolvimento
6. Teste das rotas no Insomnia
7. Modelo de dados

---

## 1. Requisitos
* Node.js 18+
* Yarn ou npm
* MySQL 8+
* Insomnia (ou Postman)

## 2. Configuração do projeto
```bash
# clonar o repositório
$ git clone <repo-url>
$ cd cloud-test

# instalar dependências
$ yarn    # ou npm install
```

## 3. Configuração do banco de dados MySQL
Crie o banco e a tabela:

```sql
CREATE DATABASE cloud_test;
USE cloud_test;

CREATE TABLE product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

> A aplicação se conecta usando o usuário **root** com senha **3724** e host `localhost:3306`. Ajuste conforme sua realidade.

## 4. Variáveis de ambiente
Crie um arquivo `.env` na raiz com o seguinte conteúdo:

```dotenv
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=3724
DB_NAME=cloud_test
```

## 5. Execução em modo desenvolvimento
```bash
# iniciar o server com hot-reload
$ yarn dev

# ou
$ npm run dev
```
O servidor ficará disponível em `http://localhost:3000` (ou pelo IP da máquina, ex.: `http://192.168.15.68:3000`).

## 6. Teste das rotas no Insomnia
Importe manualmente as requisições ou crie uma coleção com os exemplos abaixo. Todos os pedidos devem ter `Content-Type: application/json` quando houver corpo.

| Método | Rota | Descrição |
|--------|------|-----------|
| GET    | /products        | Listar todos os produtos |
| GET    | /products/:id    | Obter produto por ID |
| POST   | /products        | Criar novo produto |
| PUT    | /products/:id    | Atualizar produto |
| DELETE | /products/:id    | Deletar produto |

### Exemplos

1. **Listar produtos**
   ```http
   GET http://localhost:3000/products
   ```

2. **Criar produto**
   ```http
   POST http://localhost:3000/products
   Content-Type: application/json

   {
     "name": "Notebook",
     "description": "Dell Inspiron 14",
     "price": 3999.90
   }
   ```

3. **Obter por ID**
   ```http
   GET http://localhost:3000/products/1
   ```

4. **Atualizar**
   ```http
   PUT http://localhost:3000/products/1
   Content-Type: application/json

   { "price": 3599.00 }
   ```

5. **Excluir**
   ```http
   DELETE http://localhost:3000/products/1
   ```

### Import JSON para Insomnia
Copie o trecho abaixo e importe em `File → Import → Raw Data`.

```json
{
  "_type": "export",
  "__export_format": 4,
  "__export_date": "2025-06-13T00:00:00.000Z",
  "resources": [
    {
      "_id": "wrk_cloud_test_api",
      "parentId": null,
      "modified": 0,
      "created": 0,
      "name": "Cloud-Test API",
      "description": "Coleção de rotas para testar a API de produtos.",
      "scope": "collection",
      "_type": "workspace"
    },
    {
      "_id": "req_get_products",
      "parentId": "wrk_cloud_test_api",
      "modified": 0,
      "created": 0,
      "url": "http://localhost:3000/products",
      "name": "GET /products",
      "method": "GET",
      "body": {},
      "parameters": [],
      "headers": [],
      "_type": "request"
    },
    {
      "_id": "req_get_product",
      "parentId": "wrk_cloud_test_api",
      "modified": 0,
      "created": 0,
      "url": "http://localhost:3000/products/{{ productId }}",
      "name": "GET /products/:id",
      "method": "GET",
      "body": {},
      "parameters": [],
      "headers": [],
      "_type": "request"
    },
    {
      "_id": "req_post_product",
      "parentId": "wrk_cloud_test_api",
      "modified": 0,
      "created": 0,
      "url": "http://localhost:3000/products",
      "name": "POST /products",
      "method": "POST",
      "body": {
        "mimeType": "application/json",
        "text": "{\n  \"name\": \"Notebook\",\n  \"description\": \"Dell Inspiron 14\",\n  \"price\": 3999.90\n}"
      },
      "parameters": [],
      "headers": [
        { "name": "Content-Type", "value": "application/json" }
      ],
      "_type": "request"
    },
    {
      "_id": "req_put_product",
      "parentId": "wrk_cloud_test_api",
      "modified": 0,
      "created": 0,
      "url": "http://localhost:3000/products/{{ productId }}",
      "name": "PUT /products/:id",
      "method": "PUT",
      "body": {
        "mimeType": "application/json",
        "text": "{ \n  \"price\": 3599.00 \n}"
      },
      "parameters": [],
      "headers": [
        { "name": "Content-Type", "value": "application/json" }
      ],
      "_type": "request"
    },
    {
      "_id": "req_delete_product",
      "parentId": "wrk_cloud_test_api",
      "modified": 0,
      "created": 0,
      "url": "http://localhost:3000/products/{{ productId }}",
      "name": "DELETE /products/:id",
      "method": "DELETE",
      "body": {},
      "parameters": [],
      "headers": [],
      "_type": "request"
    }
  ]
}
```

## 7. Modelo de dados
| Campo       | Tipo            | Observação             |
|-------------|-----------------|------------------------|
| `id`        | INT (PK)        | auto-incremento        |
| `name`      | VARCHAR(100)    | obrigatório            |
| `description` | TEXT          | opcional               |
| `price`     | DECIMAL(10,2)   | obrigatório            |
| `createdAt` | TIMESTAMP       | preenchido automaticamente |

---

Pronto! Agora você possui toda a documentação para configurar, executar e testar a API de produtos com Insomnia e MySQL. :rocket: