
const express = require('express');
const res = require('express/lib/response');
const port = 3000;
const app = express();
const http = require('http');

app.use(express.json());

app.get('/hello', (req, res) => {
    res.send('hola mundo');
})

app.listen(port, () => {
    console.log(`servidor en el puerto ${port}`);
})


let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
        id: 2,
        content: "HTML is easy sddd",
        date: "2019-05-30T17:30:31.098Z",
        important: true
      }
]


app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (resquest, response) => {
    const id = Number(resquest.params.id)
    //console.log(id, typeof id);
    const note = notes.find(note => note.id === id)
    // const note = notes.find(note => {
    //     console.log(note.id, typeof note.id, id, typeof id, note.id === id)
    //     return note.id == id
    // })
    //console.log(note);

    if(note){
        response.json(note);
    }else{
        response.json({'msj': 'informacion no existe'});
        response.status(404).end()
    }

    response.json(note)
})


app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.json({'msj': 'informacion eliminada'});
    response.status(204).end()
})


const generateId = () =>{
    const maxId = notes.length > 0
     ? Math.max(...notes.map(n => n.id)) : 0
    return maxId + 1
}


app.post('/api/notes', (request, response) =>{
    const body = request.body

    if(!body.content){
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important ||  false,
        date: new Date(),
        id: generateId,
    }

    notes = notes.concat(note)

    console.log(note);
    response.json(note)
})









