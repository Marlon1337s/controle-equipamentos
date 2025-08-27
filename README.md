# Controle de Equipamentos

API em **Node.js + TypeScript + Express + TypeORM + PostgreSQL** para gerenciar:
- Tipos de equipamentos (ex.: notebooks, projetores)
- Equipamentos em si
- Funcionários
- Reservas de uso (quem pegou qual equipamento, quando e por quanto tempo)

Regras importantes:
- Reservas não podem se sobrepor em data/hora.
- Nada é apagado de verdade: usamos **soft delete** (`is_active = false`).
- O equipamento só fica com status `emprestado` quando há reserva ativa.

---

##  Rodando o projeto em outra máquina

### 1. Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18+ recomendada)
- [npm](https://www.npmjs.com/) (vem junto com o Node)
- [PostgreSQL](https://www.postgresql.org/) (versão 14+)
- Um cliente SQL (pgAdmin, DBeaver, ou terminal `psql`)

---

### 2. Clone o repositório
Na máquina de destino:
```bash
git clone https://github.com/Marlon1337s/controle-equipamentos.git
cd controle-equipamentos
```
---

### 3. Instale as dependências
```bash
npm install
```
- As dependências principais são: Express, TypeORM, pg, reflect-metadata e dotenv

---

### 4. No PostgreSQL, crie o Banco:
```bash
CREATE DATABASE controle_equipamentos;
```
---

### 5. Configure o .env
Na pasta raiz do projeto, crie um arquivo .env:
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=controle_equipamentos
```
---

### 6. Rode o servidor:
Em modo de desenvolvedor (dev):
```bash
npm run dev
```
Para compilar e rodar em "produção"
```bash
npm run build
npm start
```
Se tudo der certo você verá:
```bash
[DB] Conectado com sucesso
[HTTP] Servidor ouvindo em http://localhost:3000
```
## Observações:
O projeto foi feito para ser simples de rodar em qualquer máquina com Node e PostgreSQL. <br>
Basta ajustar o .env e ter o banco criado.


