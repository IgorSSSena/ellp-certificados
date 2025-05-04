# 🎓 Certifica ELLP

Sistema de **Cadastro e Geração de Certificados** para alunos voluntários do projeto de extensão **ELLP - Ensino Lúdico de Lógica e Programação**.

## 📘 Visão Geral

O sistema **Certifica ELLP** permite o cadastro de cursos e voluntários, vinculação entre ambos e emissão automática de certificados. Ele é dividido em dois portais:

- **Portal do Administrador**:
  - Cadastro de cursos e voluntários;
  - Vinculação de voluntários aos cursos;
  - Marcação de conclusão de participação;
  - Geração de certificados.

- **Portal do Voluntário**:
  - Login e autenticação;
  - Visualização de cursos vinculados;
  - Emissão de certificados para cursos concluídos.

---

## 🚀 Tecnologias Utilizadas

### 🎨 Front-End
- [React.js](https://reactjs.org/)
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [TailwindCSS](https://tailwindcss.com/)

### ⚙️ Back-End
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [JWT (JSON Web Token)](https://jwt.io/)
- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js)
- [dotenv](https://github.com/motdotla/dotenv)
- [cors](https://github.com/expressjs/cors)

### 🛢️ Banco de Dados
- [PostgreSQL](https://www.postgresql.org/)

---

## 📁 Estrutura de Pastas

```
/elpp-certificados
│
├── backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── tests/
│   ├── .env
│   └── server.js
│
├── frontend
│   ├── public/
│   ├── src/
│   ├── tailwind.config.js
│   └── package.json
│
├── README.md
```

---

## 🧪 Estratégia de Testes

- **Jest** (testes unitários e integração no back-end)
- **Cypress** (testes end-to-end no front-end)

---

## ⚙️ Configuração e Execução

### ✅ Pré-requisitos
- Node.js instalado
- PostgreSQL instalado e rodando
- Conta no GitHub (para versionamento)

---

### 1️⃣ Clonar o projeto

```bash
git clone https://github.com/seu-usuario/elpp-certificados.git
cd elpp-certificados
```

---

### 2️⃣ Instalar dependências

#### 🔧 Backend
```bash
cd backend
npm install
```

#### 🎨 Frontend
```bash
cd ../frontend
npm install
```

---

### 3️⃣ Configurar o ambiente

#### Arquivo `.env` no backend:

```
PORT=3001
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=elpp_certificados
DB_HOST=localhost
JWT_SECRET=uma_senha_secreta
```

---

### 4️⃣ Rodar o projeto

#### Backend
```bash
cd backend
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npm run dev
```

#### Frontend
```bash
cd frontend
npm start
```

---

### 🧪 Rodar os testes

#### Backend (Jest)
```bash
cd backend
npm run test
```

---



## 🧠 Arquitetura

O sistema segue uma arquitetura **em camadas**, com separação entre apresentação, lógica e persistência. Usamos:

- **DTOs** para transporte de dados
- **Repository Pattern** para acesso ao banco
- **Camadas claras de controller, service e model**

---
