const http = require('http')
const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(express.json());
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[header] - :response-time ms'))
const cors = require('cors')
const Note = require('./models/note')

require('dotenv').config()
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
app.use(cors())
//import mongoose from 'mongoose'
const mongoose = require('mongoose');
const note = require('./models/note');

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {

  Note.find({}).then(notes => {
    response.json(notes);
  });
})

app.get('/api/info', (request, response) => {
  const argHora = new Date()
  response.send("Tenemos Almacenadas un total de " + notes.length + " notas <br> <br> Y la fecha es: " + argHora)
})

app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})



app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})



app.post('/api/notes', (request, response) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    });
  }
  try {
    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    })

    note
      .save()
      .then(savedNote => savedNote.toJSON())
      .then(savedAndFormattedNote => {
        response.json(savedAndFormattedNote)
      }) 
    }
  catch(error) {
      error => next(error)
    }
  })
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)