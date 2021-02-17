// const assert = require('assert')
const app = require('./app').app
const request = require('supertest')
const assert = require('assert')

describe('appTest', () => {
    let baseRoute = '/api/link'
    it('first', (done) => {
        request(app)
            .get('/test')
            .expect('Test complete')
            .end(done)
    })
    it('link', (done) => {
        request(app) 
            .get(baseRoute + '/')
            // .expect('Test with link')
            .expect((response) => {
                assert.strictEqual(response.error.status, 401 )
            })
            .end(done)
    })
})