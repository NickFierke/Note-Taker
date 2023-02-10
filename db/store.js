const util = require('util');
const fs = require('fs');

const uuidv1 = require('uuid/v1');

const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);

class NoteStore {
    readData() {
        return readAsync('db/db.json', 'utf8');
    }

    saveData(note) {
        return writeAsync('db/db.json', JSON.stringify(note));
    }

    retrieveNotes() {
        return this.readData().then((notes) => {
            let parsedNotes;

            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
        });
    }

    createNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("Note must have both a 'title' and 'text'");
        }

        const newNote = { title, text, id: uuidv1() };

        return this.retrieveNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.saveData(updatedNotes))
            .then(() => newNote);
    }

    deleteNote(id) {
        return this.retrieveNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.saveData(filteredNotes));
    }
}

module.exports = new NoteStore();
