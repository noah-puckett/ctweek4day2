/* eslint-disable no-console */
const client = require('../utils/client');

client.query(`
    DROP TABLE IF EXISTS goblins;
`)
    .then(
        () => console.log('drop tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });
