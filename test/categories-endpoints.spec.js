const { expect } = require('chai')
const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')

describe('Categories Endpoints', function() {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db('categories', 'subcategories'))

//1 DESCRIBE - get categories endpoint
  describe(' 1 GET /api/categories', () => {
    context(`1A Get all Categories`, () => {
      it(`responds with 200`, () => {
        return supertest(app)
          .get(`/api/categories`)
          .expect(200)
      })
    })
  })
//2 DESCRIBE - categories by id    
  describe(` 2 GET /api/categories/:category_id`, () => {
    //2A CONTEXT - to categories by id - given no category id in db
      context(`2A Given no category`, () => {
        it(`responds with 404`, () => {
          const category_id = 123456
          return supertest(app)
            .get(`/api/categories/${category_id}`)
            .expect(404, { error: { message: `Category Not Found` } })
         })
      })
  //2B CONTEXT - to categories by id - given there are categories by id in db
      context('2B Given there are categories in the database', () => {
        it('responds with 200 and the specified category', () => {
          const categoryId = 2
          return supertest(app)
            .get(`/api/categories/${categoryId}`)
            .expect(200)
        })
      })
  })
//1 DESCRIBE - get catsandsubcats endpoint
  describe(' 1 GET /api/catsandsubcats', () => {
    context(`1A Get all Categories and subcategories`, () => {
      it(`responds with 200`, () => {
        return supertest(app)
          .get(`/api/catsandsubcats`)
          .expect(200)
      })
    })
  })
})