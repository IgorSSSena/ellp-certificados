# 📜 Planejamento — Sistema Certifica ELLP

Este documento descreve parte do planejamento do sistema **Certifica ELLP**, voltado para o gerenciamento de cursos e emissão de certificados de alunos voluntários do projeto ELLP.

---

## ✅ Lista de Requisitos Funcionais

| Código | Descrição                                                                 |
|--------|--------------------------------------------------------------------------|
| RF01   | O sistema deve permitir o login do administrador.                        |
| RF02   | O sistema deve permitir ao administrador criar, ler, atualizar e excluir cursos. |
| RF03   | O sistema deve permitir ao administrador criar, ler, atualizar e excluir voluntários. |
| RF04   | O sistema deve permitir o vínculo de um voluntário a um curso.           |
| RF05   | O sistema deve permitir ao administrador marcar a participação de um voluntário como "concluída". |
| RF06   | O sistema deve permitir que o voluntário faça login no portal.           |
| RF07   | O sistema deve permitir ao voluntário visualizar os cursos concluídos.   |
| RF08   | O sistema deve permitir que o voluntário emita seu certificado.          |
| RF09   | O sistema deve gerar certificados automaticamente com as informações necessárias. |

---

## 🧱 Tecnologias Utilizadas

| Camada          | Tecnologia                   |
|------------------|-------------------------------|
| Front-end       | React.js, Axios, TailwindCSS, React Router DOM |
| Back-end        | Node.js, Express, JWT, bcrypt.js, Sequelize |
| Banco de Dados  | PostgreSQL                   |
| Testes          | Jest (unitários), Cypress (end-to-end) |
| Repositório     | GitHub + Issues + GitFlow     |

---

## 🧪 Estratégia de Testes

Foram implementadas as seguintes abordagens de teste:

- **Testes Unitários:** Verificação de funções isoladas e lógica de negócio.
- **Testes de Integração:** Comunicação entre camadas back-end e banco.
- **Testes de API:** Validação de endpoints REST.
- **Testes End-to-End:** Validação do fluxo completo pelo Cypress.

---

📎 **Documentação completa**:  
[Acesse aqui no Google Docs](https://docs.google.com/document/d/10xkb-wfnxJ5UmPuMDEX534wOmIGPnTKfLWVFZvSXmqA/edit?usp=sharing)

---

