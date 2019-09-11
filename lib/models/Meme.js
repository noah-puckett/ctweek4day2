const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
    top: {
        type: String,
        default: 'I know your brain is dummy thicc, try again!'
    },

    image: {
        type: String,
        required: true,
    },

    bottom: {
        type: String,
        default: 'you forgot to type bottom text, UwU'
    }
});

const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;
