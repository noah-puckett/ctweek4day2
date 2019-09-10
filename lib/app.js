const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
// app.use('/api/v1/memes', require('./routes/memes'));
app.use('/api/v1/goblins', require('./routes/goblins'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
