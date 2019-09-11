require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const client = require('../lib/utils/client');
const child_process = require('child_process');

describe('app routes', () => {
  
    beforeEach(() => {
        child_process.execSync('npm run recreate-tables');
    });

    afterAll(() => {
        return client.end();
    });

    const TEST_GOBLIN = {
        name: 'kevin',
        color: 'slime green',
        teeth: 65
    };

    const createGoblin = (goblin = TEST_GOBLIN) => request(app)
        .post('/api/v1/goblins')
        .expect(200)
        .send(goblin);

    const testGoblin = goblin => {
        expect(goblin).toEqual({
            id: expect.any(Number),
            name: 'kevin',
            color: 'slime green',
            teeth: 65
        });
    };

    it('creates a goblin', () => {
        return createGoblin()
            .then(({ body }) => {
                testGoblin(body);
            });
    });

    it('gets a goblin by id', () => {
        return createGoblin()
            .then(({ body }) => {
                return request(app)
                    .get(`/api/v1/goblins/${body.id}`)
                    .expect(200);
            })
            .then(({ body }) => {
                testGoblin(body);
            });
    });

    
    it('gets a list of goblins', () => {
        return Promise.all([
            createGoblin({ name: 'kevin', color: 'hideous', teeth: 33 }),
            createGoblin({ name: 'keviner', color: 'hideouser', teeth: 32 }),
            createGoblin({ name: 'kevinest', color: 'hideousest', teeth: 31 })
        ])
            .then(() => {
                return request(app).get('/api/v1/goblins')
                    .expect(200)
                    .then(({ body }) => {
                        expect(body.length).toBe(3);
                    });
            });
    });
        
    it('updates a goblin', () => {
        return createGoblin()
            .then(({ body }) => {
                body.name = 'Terrible Baby';
                return request(app)
                    .put(`/api/v1/goblins/${body.id}`)
                    .send(body)
                    .expect(200);
            })
            .then(({ body }) => {
                expect(body.name).toBe('Terrible Baby');
            });
    });
            
    it('returns 404 on non-existant id', () => {
        return request(app)
            .get('/api/v1/goblins/100')
            .expect(404);
    });
            
    it('MURDERS a goblin', () => {
        return createGoblin()
            .then(({ body }) => {
                return request(app)
                    .delete(`/api/v1/goblins/${body.id}`)
                    .expect(200)
                    .then(({ body: removed }) => {
                        expect(removed).toEqual(body);
                        return body.id;
                    });
            })
            .then(id => {
                return request(app)
                    .get(`/api/v1/goblins/${id}`)
                    .expect(404);
            });
    });
});
