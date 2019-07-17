require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Goblin = require('../lib/models/Goblin');

describe('goblin routes', () => {

    beforeAll(() => {
        connect();
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });
    
    
    // POST /api/v1/goblins to create a goblin
    it('POST route creates a goblin in the database', () => {

        return request(app)
            .post('/api/v1/goblins')
            .send({ name: 'soot sneaksnout', color: 'ashy', teeth: 55 })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    name: 'soot sneaksnout', 
                    color: 'ashy', 
                    teeth: 55, 
                    __v: 0
                });
            });
    });  
    
    
    // GET /api/v1/goblins to get all goblins
    it('GET returns all goblins', async() => {

        const goblin = await Goblin.create({
            name: 'soot sneaksnout', 
            color: 'ashy', 
            teeth: 55, 
            __v: 0
        });

        return request(app)
            .get('/api/v1/goblins')
            .then(res => {
                const goblinJSON = JSON.parse(JSON.stringify(goblin));
                expect(res.body).toEqual([goblinJSON]);
            });
    });


    // GET /api/v1/goblins/:id to get a goblin by id
    it('GET /:id returns a goblin by id', async() => {

        const goblin = await Goblin.create({
            name: 'soot sneaksnout', 
            color: 'ashy', 
            teeth: 55, 
            __v: 0
        });

        return request(app)
            .get(`/api/v1/goblins/${goblin._id}`)
            .then(res => {
                const goblinJSON = JSON.parse(JSON.stringify(goblin));
                expect(res.body).toEqual(goblinJSON);
            });
    });

    //PATCH /api/v1/:id
    it('PATCH goblins/:id updates a single value on a goblin by id', async() => {

        const goblin = await Goblin.create({
            name: 'starting gobbo, ready to patch',
            color: 'greenish-pink',
            teeth: 86,
            __v: 0
        });

        const newGob = {
            name: 'I CREATE LIFE',
            color: 'greenish-pink',
            teeth: 86,
            __v: 0
        };

        return request(app)
            .patch(`/api/v1/goblins/${goblin._id}`)
            .send(newGob)
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    name: 'I CREATE LIFE',
                    color: 'greenish-pink',
                    teeth: 86,
                    __v: 0
                });
            });
    });

    // PUT /api/v1/goblins/:id to update a goblin
    it('PUT goblins/:id updates a goblin by id', async() => {

        const goblin = await Goblin.create({
            name: 'gumbler the lipmasher', 
            color: 'blue-green', 
            teeth: 2, 
            __v: 0
        });

        return request(app)
            .put(`/api/v1/goblins/${goblin._id}`)
            .send({ 
                name: 'soot sneaksnout', 
                color: 'ashy', 
                teeth: 55, 
                __v: 0 })
            .then(res => {
                expect(res.body).toEqual({ 
                    _id: expect.any(String),
                    name: 'soot sneaksnout', 
                    color: 'ashy', 
                    teeth: 55, 
                    __v: 0 });
            });
    });

    // DELETE /api/v1/goblins/:id to delete a goblin
    it('DELETEs a goblin by its id', async() => {

        const goblin = await Goblin.create({
            name: 'soot sneaksnout', 
            color: 'ashy', 
            teeth: 55, 
            __v: 0
        });

        return request(app)
            .delete(`/api/v1/goblins/${goblin._id}`)
            .then(res => {
                expect(res.body).toEqual({ 
                    _id: expect.any(String),
                    name: 'soot sneaksnout', 
                    color: 'ashy', 
                    teeth: 55, 
                    __v: 0 });
            });
    });
});
