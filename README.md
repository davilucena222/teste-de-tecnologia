# CONFIGURAÇÕES DA APLICAÇÃO

<p>
  Para executar a aplicação antes é preciso ter o banco de dados MySQL instalado e configurado localmente com as credenciais. Abaixo segue um exemplo:
</p>

```js
import mysql from "mysql";

export const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ubuntu",
  database: "crud"
});
```

<p>
  O host deve ser o localhost (a própria máquina onde o banco está rodando), o user deve ser usuário criado para autenticar a conexão com o banco de dados, neste caso ele é root. 

  A password deve ser a senha associada ao nome de usuário do banco de dados.
  Por último, o nome do banco de dados com o qual deseja-se conectar, que neste caso está definido como "crud".

  O banco de dados utilizado para o desenvolvimento foi o MySQL para Windows.

  A configuração dessas credenciais devem ser feitas no seguinte caminho de pastas: back-end/src/lib/database_config.ts
</p>

<a href="https://www.youtube.com/watch?v=nIr3vbGS7e4&ab_channel=KKJavaTutorials">Exemplo de vídeo para criação de um usuário no MySQL Database</a>

<p>Após isso, basta ir até a pasta back-end/src/lib/database_config.ts e substituir os campos  pelas credenciais do usuário do seu banco de dados.</p>

# LINK PARA BAIXAR O BANCO DE DADOS

<p>
  Para baixar o MySQL, basta acessar esse link:

  <a href="https://dev.mysql.com/downloads/" target="_blank">
    MySQL Download
  </a>
</p>

# SCRIPT SQL UTILIZADO PARA GERAR A TABELA DE USUÁRIOS

```sql
  SELECT * FROM crud.usuarios;CREATE TABLE `usuarios` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(45) NOT NULL,
    `email` varchar(45) NOT NULL,
    `phone` varchar(45) NOT NULL,
    `created_at` datetime NOT NULL,
    `updated_at` datetime DEFAULT NULL,
    `deleted_at` date DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) 
```

# Rodando aplicação e portas

<p>
  A aplicação front-end estará rodando na porta <a href="http://localhost:5173/" target="_blank">http://localhost:5173/</a>
</p>

<p>
  Enquanto a aplicação back-end estará rodando na porta  <a href="http://localhost:4000/" target="_blank">http://localhost:4000/</a>
</p>

<p>
  Após clonar o projeto e realizar a configuração do banco de dados, execute os comandos abaixo para instalar as dependências:
</p>

```bash
# Instalar as dependências para o front-end e back-end
$ npm install

# Para rodar a aplicação
$ npm run dev
```