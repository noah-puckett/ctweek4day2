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
    it('GET returns all memes', async() => {

        const meme = await Meme.create({
            top: 'waelcoem', 
            image: 'https://i.ytimg.com/vi/8SU0gFPMwP8/maxresdefault.jpg', 
            bottom: 'to mae kitchaen',
            __v: 0
        });

        return request(app)
            .get('/api/v1/memes')
            .then(res => {
                const memeJSON = JSON.parse(JSON.stringify(meme));
                expect(res.body).toEqual([memeJSON]);
            });
    });


    // GET /api/v1/memes/:id to get a meme by id
    it('GET /:id returns a meme by id', async() => {

        const meme = await Meme.create({
            top: 'waelcoem', 
            image: 'https://i.ytimg.com/vi/8SU0gFPMwP8/maxresdefault.jpg', 
            bottom: 'to mae kitchaen',
            __v: 0
        });

        return request(app)
            .get(`/api/v1/memes/${meme._id}`)
            .then(res => {
                const memeJSON = JSON.parse(JSON.stringify(meme));
                expect(res.body).toEqual(memeJSON);
            });
    });

    // PUT /api/v1/memes/:id to update a meme
    it('PUT memes/:id updates a meme by id', async() => {

        const meme = await Meme.create({
            top: 'waelcoem', 
            image: 'https://i.ytimg.com/vi/8SU0gFPMwP8/maxresdefault.jpg', 
            bottom: 'to mae kitchaen',
            __v: 0
        });

        return request(app)
            .put(`/api/v1/memes/${meme._id}`)
            .send({ 
                top: 'we have banaenaes', 
                image: 'https://pics.me.me/rubyfruitjumble-psychic-reads-my-mind-my-mind-waelcome-to-my-28235019.png', 
                bottom: 'and avacadis',
                __v: 0 })
            .then(res => {
                expect(res.body).toEqual({ 
                    _id: expect.any(String),
                    top: 'we have banaenaes', 
                    image: 'https://pics.me.me/rubyfruitjumble-psychic-reads-my-mind-my-mind-waelcome-to-my-28235019.png', 
                    bottom: 'and avacadis',
                    __v: 0 });
            });
    });

    // DELETE /api/v1/memes/:id to delete a meme
    it('DELETEs a meme by its id', async() => {
        const meme = await Meme.create({
            top: 'waelcoem', 
            image: 'https://i.ytimg.com/vi/8SU0gFPMwP8/maxresdefault.jpg', 
            bottom: 'to mae kitchaen',
            __v: 0
        });

        return request(app)
            .delete(`/api/v1/memes/${meme._id}`)
            .then(res => {
                expect(res.body).toEqual({ 
                    _id: expect.any(String),
                    top: 'waelcoem', 
                    image: 'https://i.ytimg.com/vi/8SU0gFPMwP8/maxresdefault.jpg', 
                    bottom: 'to mae kitchaen',
                    __v: 0 });
            });
    });
});
