const mongoose = require('mongoose');

const goblinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    color: {
        type: String,
    },

    teeth: {
        type: Number
    }
});

const Goblin = mongoose.model('Goblin', goblinSchema);

module.exports = Goblin;
