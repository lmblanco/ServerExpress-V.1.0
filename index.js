const express = require('express');
const res = require('express/lib/response');
const port = 3001;
const app = express();
const http = require('http');
const { request } = require('https');

app.use(express.json());

app.get('/hello', (req, res) => {
    res.send('hola mundo');
})

app.listen(port, () => {
    console.log(`servidor en el puerto ${port}`);
})

let persons = [
    {
        id: 1,
        name: "Arturo Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-234345"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    }
]

app.get('/api/persons', (request, response) =>{
    response.json(persons)
})

app.get('/info', (req, res) => {
    const maxId = persons.length > 0
     ? Math.max(...persons.map(n => n.id)) : 0

    res.send('Phonebook has info for '+maxId+' people <br>'+ new Date());
})





