import express from 'express';
import { createConnection } from 'mysql';
const app = express()
const PORT = 3000
const connection = createConnection({
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
})

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

// Criando tabela que será utilizada.
connection.query('CREATE TABLE people (id int not null auto_increment, name varchar(255), primary key(id))', function (error, results, fields) {
    if (error) throw error
    console.log(`Tabela criada: ${JSON.stringify(results)} - ${JSON.stringify(fields)}`)
})

// Realizando o cadastro de um registro na tabela.
connection.query('INSERT INTO `people`(`name`) VALUES(?)', ['Marcelo Magrinelli'], function (error, results, fields) {
    if (error) throw error
    console.log(`Dados inseridos: ${JSON.stringify(results)} - ${JSON.stringify(fields)}`)
})

app.get('/', (request, response) => {

    connection.query('SELECT `name` FROM `people`', function (error, results, fields) {
        if (error) throw error

        const retorno = `<h1>Full Cycle Rocks!</h1> <ul>${results.map(result => {
            return `<li>${result.name}</li>`
        }).join('')}</ul>`

        console.log(retorno)
        response.status(200)
        response.send(retorno)
    })
})

app.listen(PORT, () => {
    console.log('Rodando na porta ' + PORT)
})