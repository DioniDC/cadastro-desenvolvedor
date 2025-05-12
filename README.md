# Cadastro de Desenvolvedores (React + Node + Docker)

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React + React Bootstrap
- **Backend:** Node.js + Express + Sequelize + SQLite
- **Infraestrutura:** Docker + Docker Compose

---

## Estrutura do Projeto

> Estruturei tudo no mesmo repositório `cadastro-desenvolvedor`.  
> É a primeira vez que monto frontend + backend rodando em um único Docker Compose.

```
cadastro-desenvolvedor/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── public/
│   └── src/
├── docker-compose.yml
└── README.md
```

---

Como executar o projeto

```bash
git clone https://github.com/DioniDC/cadastro-desenvolvedor.git
cd cadastro-desenvolvedor
docker compose up --build
```

---

## Endpoints

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend (Swagger): [http://localhost:3001/api-docs](http://localhost:3001/api-docs)
