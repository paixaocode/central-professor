## FIAP Hackathon - central-professor
Este é o front-end do projeto desenvolvido para o hackathon da FIAP 2025 (Turma 2024), como parte da pós-graduação em Desenvolvimento Full Stack. O objetivo do projeto é fornecer a interface para usuário cadastrar questões e provas

### 🚀 Tecnologias Utilizadas
- Node.js.
- Angular 2+
- PO UI

### 📂 Estrutura do Projeto

├── src

│   ├── App       

│   ├── ├── Interceptors ➡ Serviços que interceptam e modificam requisições HTTP e respostas antes que cheguem ao seu destino final

│   ├── ├── Models ➡ Agrupam componentes, serviços, diretivas e outros elementos relacionados

│   ├── ├── Services ➡ Classes que contém lógica de negócios, acesso a dados ou outra funcionalidade que não seja diretamente relacionada à interface do usuário (UI).

├── .assets ➡ Recursos estáticos da aplicação contendo arquivos de imagens e estilos

├── .env ➡ Variáveis de ambiente

├── package.json ➡ Dependências e scripts do projeto

└── README.md ➡ Documentação do projeto

## ⚙️ Instalação e Uso

**Pré-requisitos**
- Node.js instalado
- Angular CLI instalado
- Back-end rodando ([Repositório Back-end](https://github.com/oPedroFlores/fiap-hackathon-server.git))

**Passos para Instalar**
- Clone o repositório:
```
git clone https://github.com/paixaocode/central-professor.git
```

- Acesse o diretório do projeto:
```
cd frontend
```

- Instale as dependências:
```
npm install
```

- Inicie o servidor:
```
npm start
```

Acesse a aplicação em http://localhost:4200.
