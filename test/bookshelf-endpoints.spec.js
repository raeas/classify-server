const { expect } = require('chai')
const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const { makeBooksArray } = require('./books.fixtures')

describe('Bookshelf Endpoints', function() {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db('categories', 'subcategories', 'books'))

  afterEach('cleanup', () => db.raw('TRUNCATE books RESTART IDENTITY CASCADE'))

//1 DESCRIBE - get bookshelf endpoint
  describe(' 1 GET /api/bookshelf', () => {
    context(`1A Get all books from bookshelf`, () => {
      const testBooks = makeBooksArray()
      beforeEach('insert books', () => {
        return db
          .into('books')
          .insert(testBooks)
          .then(() => {
            return db
          })
      })
    it(`responds with 200`, () => {
        return supertest(app)
          .get(`/api/bookshelf`)
          .expect(200)
      })
    })
  })
})