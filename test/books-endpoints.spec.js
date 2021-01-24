const { expect } = require('chai')
const knex = require('knex')
const supertest = require('supertest')
const app = require('../src/app')
const { makeBooksArray } = require('./books.fixtures')

describe('Books Endpoints', function() {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db('books'))

  afterEach('cleanup', () => db.raw('TRUNCATE books'))

//1 DESCRIBE - get books endpoint
  describe(' 1 GET /api/books', () => {
//1A - CONTEXT to books endpoint - given no books in the db
        context('1A Given no books', () => {
          it('responds with 200 and an empty list', () => {
            return supertest(app)
              .get('/api/books')
              .expect(200, [])
      })
    })
//1B - CONTEXT to books endpoint - given there are books in the db
    context('1B Given there are books in the database', () => {
      const testBooks = makeBooksArray()

      beforeEach('insert books', () => {
        return db
          .into('books')
          .insert(testBooks)
          .then(() => {
            return db
          })
      })

      it('responds with 200 and all of the books', () => {
        return supertest(app)
        .get('/api/books')
        .expect(200, testBooks)
      })
    })
  })

//2 DESCRIBE - books by id    
describe(` 2 GET /api/books/:book_id`, () => {
  //2A CONTEXT - to folders by id - given no folder id in db
      context(`2A Given no books`, () => {
        it(`responds with 404`, () => {
          const book_id = 123456
          return supertest(app)
            .get(`/api/books/${book_id}`)
            .expect(404, { error: { message: `Book Not Found` } })
         })
      })
//2B CONTEXT - to folders by id - given there are folders by id in db
  context('2B Given there are folders in the database', () => {
    const testBooks = makeBooksArray()

  beforeEach('insert folders', () => {
    return db
      .into('books')
      .insert(testBooks)
      .then(() => {
        return db
      })
    })
    it('responds with 200 and the specified book', () => {
      const bookId = 2
      const expectedBook = testBooks[bookId - 1]
      return supertest(app)
        .get(`/api/books/${bookId}`)
        .expect(200, expectedBook)
      })
    })
  })
//3 DESCRIBE - POST folders by id  
  describe(` 3 POST /api/books`, () => {

    it(`creates a book, responding with 201 and the new book`,  function() {
      this.retries(3)
      const newBook = {
        title: 'Test new book',
        category_id: 4,
        subcategory_id: 31
      }
    return supertest(app)
      .post('/api/books')
      .send(newBook)
      .expect(201)
      .expect(res => {
        expect(res.body.title).to.eql(newBook.title)
        expect(res.body).to.have.property('id')
        expect(res.headers.location).to.eql(`/api/books/${res.body.id}`)
      })
      .then(postRes =>
        supertest(app)
        .get(`/api/books/${postRes.body.id}`)
        .expect(postRes.body)
      )
    })

    const requiredFields = ['title', 'category_id', 'subcategory_id']

    requiredFields.forEach(field => {
    const newBook = {
      title: 'Test new book',
      category_id: 1,
      subcategory_id: 3
    }

    it(`responds with 400 and an error message when the '${field}' is missing`, () => {
      delete newBook[field]

      return supertest(app)
        .post('/api/books')
        .send(newBook)
        .expect(400, {
          error: { message: `Missing '${field}' in request body` }
        })
      })
    })
  })
//4 DESCRIBE - DELETE folders by id  
  describe(`4 DELETE /api/books/:book_id`, () => {
    //4A CONTEXT - given there are no books by id to delete
    context(`4A Given no books`, () => {
      it(`responds with 404`, () => {
        const book_Id = 123456
        return supertest(app)
          .delete(`/api/books/${book_Id}`)
          .expect(404, { error: { message: `Book Not Found` } })
        })
      })
    //4B CONTEXT - given there are books by id to delete
    context('4B Given there are books in the database', () => {
      const testBooks = makeBooksArray()
  
      beforeEach('insert books', () => {
        return db
          .into('books')
          .insert(testBooks)
          .then(() => {
            return db
          })
        })
      
        it('responds with 204 and removes the book', () => {
          const idToRemove = 2
          const expectedBooks = testBooks.filter(book => book.id !== idToRemove)
          return supertest(app)
            .delete(`/api/books/${idToRemove}`)
            .expect(204)
            .then(res =>
              supertest(app)
                .get(`/api/books`)
                .expect(expectedBooks)
            )
        })
      })
    })
  //5 DESCRIBE - PATCH books by id 
  describe(`5 PATCH /api/books/:book_id`, () => {
    //5A CONTEXT given there are no books by id
    context(`5A Given no books`, () => {
      it(`responds with 404`, () => {
        const bookId = 123456
        return supertest(app)
          .patch(`/api/books/${bookId}`)
          .expect(404, { error: { message: `Book Not Found` } })
      })
    })
    //5B CONTEXT given there are books in the database
    context('5B Given there are books in the database', () => {
      const testBooks = makeBooksArray()
        
      beforeEach('insert books', () => {
        return db
          .into('books')
          .insert(testBooks)
          .then (() => {
            return db
          })
      })
        
      it('responds with 204 and updates the book', () => {
        const idToUpdate = 2
        const updateBook = {
          title: 'updated book title',
        }
        const expectedBook = {
          ...testBooks[idToUpdate - 1],
          ...updateBook
        }
        return supertest(app)
          .patch(`/api/books/${idToUpdate}`)
          .send(updateBook)
          .expect(204)
          .then(res =>
            supertest(app)
              .get(`/api/books/${idToUpdate}`)
              .expect(expectedBook)
            )
        })
      it(`responds with 400 when no required fields supplied`, () => {
        const idToUpdate = 2
        return supertest(app)
          .patch(`/api/books/${idToUpdate}`)
          .send({ irrelevantField: 'foo' })
          .expect(400, {
            error: {
              message: `Request body must contain either 'title', 'category_id', 'subcategory_id'`
            }
          })
      })
      it(`responds with 204 when updating only a subset of fields`, () => {
        const idToUpdate = 2
        const updateBook = {
          title: 'updated book title',
        }
        const expectedBook = {
          ...testBooks[idToUpdate - 1],
          ...updateBook
        }
  
        return supertest(app)
          .patch(`/api/books/${idToUpdate}`)
          .send({
            ...updateBook,
              fieldToIgnore: 'should not be in GET response'
          })
          .expect(204)
          .then(res =>
            supertest(app)
              .get(`/api/books/${idToUpdate}`)
              .expect(expectedBook)
        )
      })
    })
  })
})