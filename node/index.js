import express from 'express';
const app = express()
const PORT = 3000

app.get('/', (request, response) => {
    response.statusCode = 200
    response.send(`<h1>Full Cycle Rocks!</h1>`)
})

app.listen(PORT, () => {
    console.log('Rodando na porta ' + PORT)
})