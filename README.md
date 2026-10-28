
# ★ DiscoStudio

## ⋆ Contextualização

Uma tradicional loja física de discos de vinil enfrenta problemas no controle do seu catálogo de álbuns. Devido à alta rotatividade de edições raras e lançamentos, a falta de um sistema informatizado para gerenciar vendas e reposições causa furos no estoque, venda de discos indisponíveis e atraso em novos pedidos com fornecedores. A loja deseja trabalhar com uma gestão de estoque eficiente, mantendo uma margem mínima de segurança para cada título.

## ⋆ Objetivo

Desenvolver um sistema Web Full-stack para gerenciar o acervo de uma loja de discos, integrando funcionalidades de controle de acesso, cadastro de discos, armazenamento de título, artista/banda, preço de custo, quantidade em estoque e quantidade mínima. O sistema permite registrar movimentações de estoque (vendas e reposições), informando datas, quantidades e o usuário responsável por cada ação.

## ⋆ Diagrama de Entidades

<p align="center">
  <img src="frontend/assets/der.png" width="350"/>
</p>

## ⋆ Imagens do Programa

| Login | Home | Venda | Lista |
| :-: | :-: | :-: | :-: |
| <img src="frontend/assets/tela01.png" width="200"/> | <img src="frontend/assets/tela02.png" width="200"/> | <img src="frontend/assets/tela03.png" width="200"/> | <img src="frontend/assets/tela04.png" width="200"/> |

## ⋆ Como Testar o Programa

1. Clone o repositório.
2. Abra o projeto no VS Code e execute os comandos no terminal:

   ```bash
   cd backend
   npm install
   npx prisma generate
   npm run dev
   ```

3. Abra a pasta `Frontend` e execute o arquivo `index.html` usando a extensão Live Server.
4. Acesse o sistema e execute os casos de teste descritos abaixo.

## ⋆ Descritivo de Testes de Software

### Ferramentas e Ambiente de Teste

- **Sistema operacional:** Windows 11 Pro, versão 22H2.
- **Editor de código:** Visual Studio Code 1.89.1.
- **Back-end:** Node.js v20.11.0 e JavaScript.
- **Front-end:** HTML5, CSS e JavaScript.
- **ORM:** Prisma v5.14.0.
- **Banco de dados:** SGBD configurado no projeto e acessado por meio do Prisma Client.
- **Navegadores:** Google Chrome ou Mozilla Firefox.
- **Testes de API:** Insomnia.
- **Preparação:** servidor back-end em execução, banco de dados acessível e tabelas criadas conforme o schema do Prisma.

### CT01 — Login e Validação de Acesso

- **Requisito funcional:** autenticação e controle de acesso.
- **Descrição:** verificar se o usuário consegue entrar com credenciais válidas e se o sistema trata dados ausentes ou incorretos.
- **Pré-condições:** back-end e banco de dados em execução; existir um usuário cadastrado.
- **Passos:**
  1. Abrir o `index.html` pelo Live Server.
  2. Tentar entrar com os campos vazios.
  3. Tentar entrar com credenciais incorretas.
  4. Entrar com credenciais válidas.
- **Resultado esperado:** o sistema deve validar os campos, informar erros de autenticação e permitir o acesso com credenciais válidas.

### CT02 — Cadastro e Validação de Disco

- **Requisito funcional:** cadastro de discos.
- **Descrição:** verificar o cadastro de discos e a validação dos campos.
- **Pré-condições:** usuário autenticado e banco de dados disponível.
- **Passos:**
  1. Acessar a tela de cadastro de discos.
  2. Tentar salvar o formulário vazio.
  3. Preencher título, artista/banda, preço de custo, quantidade em estoque e estoque mínimo.
  4. Salvar o cadastro.
  5. Verificar se o disco aparece na listagem.
- **Resultado esperado:** campos obrigatórios devem ser validados e o disco cadastrado corretamente deve aparecer na listagem.

### CT03 — Busca, Edição e Exclusão de Disco

- **Requisito funcional:** consulta, edição e exclusão de discos.
- **Descrição:** verificar a busca, alteração e exclusão de registros.
- **Pré-condições:** usuário autenticado e existência de um disco de teste.
- **Passos:**
  1. Acessar a tela de cadastro de discos.
  2. Pesquisar pelo título ou artista.
  3. Editar um dado do disco e salvar.
  4. Confirmar a alteração na listagem.
  5. Excluir o disco de teste.
- **Resultado esperado:** a busca deve filtrar os resultados, a edição deve atualizar os dados e a exclusão deve remover o registro conforme as regras do sistema.

### CT04 — Movimentação de Estoque: Reposição e Venda

- **Requisito funcional:** controle de entradas e saídas de estoque.
- **Descrição:** verificar se reposições aumentam o estoque e vendas diminuem a quantidade disponível.
- **Pré-condições:** usuário autenticado, banco de dados disponível e disco com estoque conhecido.
- **Passos:**
  1. Acessar a tela de gestão de acervo e vendas.
  2. Selecionar um disco e registrar uma reposição com quantidade e data válidas.
  3. Conferir se a quantidade em estoque aumentou.
  4. Registrar uma venda com quantidade disponível e data válida.
  5. Conferir se a quantidade em estoque diminuiu.
- **Resultado esperado:** as movimentações devem ser registradas com disco, tipo, quantidade, data e usuário responsável. A reposição aumenta o estoque e a venda diminui a quantidade disponível sem gerar estoque negativo.

### CT05 — Estoque Mínimo, Ordenação e Navegação

- **Requisito funcional:** alerta de estoque mínimo, ordenação alfabética e navegação.
- **Descrição:** verificar o alerta de estoque mínimo, a ordem dos discos e os acessos entre telas.
- **Pré-condições:** usuário autenticado; existir mais de um disco cadastrado e um disco cujo estoque possa ficar abaixo do mínimo.
- **Passos:**
  1. Acessar a tela de gestão e conferir a ordem alfabética dos discos.
  2. Realizar uma venda que deixe o estoque abaixo do mínimo configurado.
  3. Verificar se o alerta é exibido.
  4. Navegar entre a página inicial e o cadastro de discos.
  5. Efetuar logout.
- **Resultado esperado:** os discos devem estar em ordem alfabética, o sistema deve alertar sobre estoque abaixo do mínimo, a navegação deve funcionar e o logout deve retornar à tela de login.

## ⋆ Infraestrutura

### 1. Linguagem de Programação e Versões

- **Back-end:** Node.js v20.11.0 com JavaScript.
- **Front-end:** HTML5, CSS e JavaScript.
- **ORM:** Prisma v5.14.0.

### 2. SGBD e Versão

O banco de dados é acessado por meio do Prisma Client. O nome e a versão do SGBD devem ser confirmados no arquivo `.env`, no `schema.prisma` e na instalação do banco utilizada.

### 3. Sistema Operacional e Ferramentas

- **Sistema operacional:** Windows 11 Pro, versão 22H2.
- **Ambiente de desenvolvimento:** Visual Studio Code 1.89.1.
- **Ferramentas de teste:** Google Chrome, Mozilla Firefox e Insomnia.
