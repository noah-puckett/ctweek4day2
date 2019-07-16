const { Router } = require('express');
const Goblin = require('../models/Goblin');

module.exports = Router() 

    .post('/', (req, res, next) => {

        const {
            name,
            color,
            teeth
        } = req.body;

        Goblin
            .create({ name, color, teeth })
            .then(goblin => {
                res.send(goblin);
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        
        Goblin
            .find()
            .then(goblins => {
                res.send(goblins);
            })
            .catch(next);
    }) 

    .get('/:id', (req, res, next) => {

        Goblin
            .findById(req.params.id)
            .then(goblin => {
                res.send(goblin);
            })
            .catch(next);
    })

    .put('/:id', (req, res, next) => {

        const {
            name,
            color,
            teeth
        } = req.body;

        Goblin
            .findByIdAndUpdate(req.params.id, { name, color, teeth }, { new: true })
            .then(replacedGob => {
                res.send(replacedGob);
            })
            .catch(next);

    })

    .delete('/:id', (req, res, next) => {

        Goblin
            .findByIdAndDelete(req.params.id)
            .then(deletedGob => {
                res.send(deletedGob);
            })
            .catch(next);
    });
