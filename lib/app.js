const express = require('express');
const app = express();
const cors = require('cors');

//TODO: import middleware with app.use(middleware name)
app.use(express.json());
app.use(cors);


module.exports = app;
