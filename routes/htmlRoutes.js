const filePath = require('path');
const expressRouter = require('express').Router();


expressRouter.get('/notes', (request, response) => {
    response.sendFile(filePath.join(__dirname, '../public/notes.html'));
});


expressRouter.get('*', (request, response) => {
    response.sendFile(filePath.join(__dirname, '../public/index.html'));
});

module.exports = expressRouter;
