const { Router } = require('express');
const client = require('../utils/client');

module.exports = Router() 

    .post('/', (req, res, next) => {

        const {
            name,
            color,
            teeth
        } = req.body;

        client.query(`
            INSERT INTO goblins (name, color, teeth)
            VALUES ($1, $2, $3)
            RETURNING
                id, name, color, teeth
            ;`, [name, color, teeth])
            .then(result => {
                res.send(result.rows[0]);
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        
        client.query(`
        SELECT
            id,
            name,
            color,
            teeth
        FROM goblins;
    `)
            .then(result => {
                res.send(result.rows);
            })
            .catch(next);
    })

    .get('/:id', (req, res, next) => {

        client.query(`
            SELECT
                id,
                name,
                color,
                teeth
            FROM goblins
            WHERE id = $1;
            `, [req.params.id])

            .then(result => {
                const goblin = result.rows[0];
                if(!goblin) {
                    throw {
                        status: 404,
                        message: `Yo, the id ${req.params.id} doesn't even EXIST!`
                    };
                }
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

        client.query(`
            UPDATE goblins
            SET name = $1,
                color = $2,
                teeth = $3
            WHERE id = $4
            RETURNING
                id, name, color, teeth;
        `, [name, color, teeth, req.params.id])
            .then(result => {
                res.send(result.rows[0]);
            })
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {

        client.query(`
        DELETE FROM goblins
        WHERE id = $1
        RETURNING
            id, name, color, teeth;
    
    ;`, [req.params.id])
            .then(result => {
                res.send(result.rows[0]);
            })
            .catch(next);
    });
