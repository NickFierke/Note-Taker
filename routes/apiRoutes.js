const expressRouter = require('express').Router();
const dataStore = require('../db/store');


expressRouter.get('/notes', (request, response) => {
    dataStore
        .fetchNotes()
        .then((notes) => {
            response.json(notes);
        })
        .catch((error) => response.status(500).json(error));
});


expressRouter.post('/notes', (request, response) => {
    dataStore
        .createNote(request.body)
        .then((note) => response.json(note))
        .catch((error) => response.status(500).json(error));
});


expressRouter.delete('/notes/:id', (request, response) => {
    dataStore
        .deleteNote(request.params.id)
        .then(() => response.json({ success: true }))
        .catch((error) => response.status(500).json(error));
});

module.exports = expressRouter;
