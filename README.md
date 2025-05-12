# Cadastro de Desenvolvedores (React + Node + Docker)

## 🛠️ Tecnologias Utilizadas
- **Frontend:** React + React Bootstrap
- **Backend:** Node.js + Express + Sequelize + SQLite
- **Infraestrutura:** Docker + Docker Compose

Estrutura do Projeto dexei juntos no cadastro-desenvolvedor
Primeira vez que estruturo um projeto assim em um unico Docker

cadastro-desenvolvedor
backend/
    Dockerfile
    package.json
    src/
frontend/
    Dockerfile
    nginx.conf
    public/
    src/
docker-compose.yml
README.md

-Como executar
git clone https://github.com/DioniDC/cadastro-desenvolvedor.git
cd cadastro-desenvolvedor
docker compose up --build

Frontend: http://localhost:3000  
Backend (Swagger): http://localhost:3001/api-docs