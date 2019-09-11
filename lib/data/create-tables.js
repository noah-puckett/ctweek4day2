const client = require('../utils/client');

client.query(`
  CREATE TABLE goblins (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    color VARCHAR(256) NOT NULL,
    teeth INTEGER NOT NULL
  );
`)
    .then(
        () => console.log('create tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });
