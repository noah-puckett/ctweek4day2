require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Meme = require('../lib/models/Meme');

describe('meme routes', () => {

    beforeAll(() => {
        connect();
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });
    
    
    // POST /api/v1/memes to create a meme
    it('POST route creates a meme in the database', () => {
        return request(app)
            .post('/api/v1/memes')
            .send({ top: 'waelcoem', image: 'https://i.ytimg.com/vi/8SU0gFPMwP8/maxresdefault.jpg', bottom: 'to mae kitchaen' })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    top: 'waelcoem', 
                    image: 'https://i.ytimg.com/vi/8SU0gFPMwP8/maxresdefault.jpg', 
                    bottom: 'to mae kitchaen',
                    __v: 0
                });
            });
    });  
    
    
    // GET /api/v1/memes to get all memes
    // GET /api/v1/memes/:id to get a meme by id
    // PUT /api/v1/memes/:id to update a meme
    // DELETE /api/v1/memes/:id to delete a meme
});

