# Sistema de Gestão de Equipamentos

Este projeto é uma **API REST** construída com **Node.js + Express + TypeORM** que gerencia:

- Funcionários
- Tipos de Equipamentos
- Equipamentos
- Reservas de Equipamentos

A ideia é simples: permitir que uma empresa controle quais equipamentos estão disponíveis, emprestados, em manutenção ou reservados, garantindo rastreabilidade com `created_by`, `updated_by`, `created_at` e `updated_at`.

---

## Tecnologias Utilizadas

- **Node.js** + **Express** – servidor e rotas
- **TypeScript** – tipagem e organização do código
- **TypeORM** – ORM para PostgreSQL
- **PostgreSQL** – banco de dados relacional
- **Migrations** – versionamento do schema
- **Middlewares** – tratamento de erros e boas práticas

---

## Estrutura do Projeto

A API segue uma arquitetura em camadas:

- **Entities** → Definição das tabelas (Funcionários, Equipamentos, Tipos, Reservas)
- **Services** → Regras de negócio (criar, atualizar, excluir logicamente, etc.)
- **Controllers** → Recebem a requisição e chamam os services
- **Routes** → Pontos de acesso para cada recurso (/equipamentos, /funcionarios, /reservas, /tipos)
- **Utils** → Tratamento de erros e utilitários

---

## Configuração do Projeto

### Pré-requisitos

- Node.js 18+
- PostgreSQL rodando localmente
- Yarn ou NPM

### Instalação

```bash
# Clonar o repositório
git clone <url-do-repositorio>

# Acessar pasta
cd sistema-equipamentos

# Instalar dependências
npm install
```

### Configuração do Banco

Crie um arquivo `.env` na raiz do projeto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=sistema_equipamentos
```



Crie um banco de dados no postgreSQL

Rodar migrations:

```bash
npm run typeorm migration:run
```
No banco, execute o script localizado em  `sql/base-data.sql`


---

## Endpoints Principais

### Funcionários

- `POST /funcionarios` → Criar funcionário
- `GET /funcionarios` → Listar funcionários
- `GET /funcionarios/:id` → Buscar funcionário
- `PUT /funcionarios/:id` → Atualizar funcionário
- `DELETE /funcionarios/:id` → Desativar funcionário

### Equipamentos

- `POST /equipamentos` → Criar equipamento
- `GET /equipamentos` → Listar equipamentos
- `GET /equipamentos/:id` → Buscar equipamento
- `PUT /equipamentos/:id` → Atualizar equipamento
- `DELETE /equipamentos/:id` → Desativar equipamento

### Tipos de Equipamentos

- `POST /tipos` → Criar tipo
- `GET /tipos` → Listar tipos
- `PUT /tipos/:id` → Atualizar tipo
- `DELETE /tipos/:id` → Desativar tipo

### Reservas

- `POST /reservas` → Criar reserva
- `PUT /reservas/:id/finalizar` → Finalizar reserva
- `GET /reservas` → Listar reservas

---

## Testando com Postman

1. Configure as rotas no Postman conforme descritas acima.
2. Use a aba **Body → JSON** para criar registros.
3. Exemplo de criação de funcionário:

```json
{
  "nome": "Maria Oliveira",
  "departamento": "Financeiro",
  "created_by": "admin"
}
```

---

## Licença

Este projeto é open-source para fins de estudo e pode ser adaptado conforme sua necessidade.
