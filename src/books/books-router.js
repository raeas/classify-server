const express = require('express')
const logger = require('../logger')
const xss = require('xss')
const path = require('path')
const BooksService = require('./books-service')
// const { getBookValidationError } = require('./book-validator')

const booksRouter = express.Router()
//use the express.json() middleware to parse the body of request
const bodyParser = express.json()

const serializeBook = (book) => ({
  id: book.id,
  title: xss(book.title),
  author_last: xss(book.author_last),
  author_first: xss(book.author_first),
  description: xss(book.description),
  category_id: book.category_id,
  subcategory_id: book.subcategory_id,
})

booksRouter
  .route('/api/books')
  .get((req, res, next) => {
    BooksService.getAllBooks(req.app.get('db'))
      .then(book => {
        res.json(book.map(serializeBook))
      })
      .catch(next)
  })
  .post(bodyParser, (req, res, next) => {
    for (const field of ['title', 'author_last', 'author_first', 'description', 'category_id', 'subcategory_id']) {
      if (!req.body[field]) {
        logger.error(`${field} is required`)
        return res.status(400).send({
          error: { message: `'${field}' is required` }
        })
      }
    }

    //Take the title, author_last, author_first, description, category_id, subcategory_id out of the req.body
    const { title, author_last, author_first, description, category_id, subcategory_id } = req.body

    //const a newBook from the title, author_last, author_first, description, category_id, subcategory_id 
    const newBook = { title, author_last, author_first, description, category_id, subcategory_id }

    //// #2 If the data is valid, process it:
    BooksService.insertBook(
      req.app.get('db'),
      newBook
    )
      .then(book => {
        logger.info(`Book with id ${book.id} created.`)
        //construct a response 201 (created) w/ the url + id and the json of the newBook
        res
          .status(201)
          .location(path.posix.join(req.originalUrl) + `/${book.id}`)
          .json(serializeBook(book))
      })
      .catch(next)
  })

booksRouter
  .route('/api/bookshelf')
  .get((req, res, next) => {
    BooksService.getBookshelf(req.app.get('db'))
      .then(book => {
        res.json(book.map(serializeBook))
      })
      .catch(next)
  })

booksRouter
  .route('/api/books/:book_id')
  .all((req, res, next) => {
    const { book_id } = req.params
    BooksService.getById(req.app.get('db'), book_id)
      .then(book => {
        if (!book) {
          logger.error(`Book with id ${book_id} not found.`)
          return res.status(404).json({
            error: { message: `Book Not Found` }
          })
        }
        res.book = book
        next()
      })
      .catch(next)
  })
  .get((req, res) => {
    res.json(serializeBook(res.book))
  })

  .patch(bodyParser, (req, res, next) => {
    const { title, author_last, author_first, description, category_id, subcategory_id } = req.body
    const bookToUpdate = { title, author_last, author_first, description, category_id, subcategory_id }
    const numberOfValues = Object.values(bookToUpdate).filter(Boolean).length
    
    if (numberOfValues === 0) {
      logger.error(`Invalid update without required fields`)
      return res.status(400).json({
        error: { 
          message: `Request body must contain either 'title', 'author_last', 'author_first', 'description', 'category_id', 'subcategory_id' `
        }
      })
    }

    const error = getBookValidationError(bookToUpdate)

    if (error) return res.status(400).send(error)

    BooksService.updateBook(
      req.app.get('db'),
      req.params.book_id,
      bookToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })

      .catch(next)

  })

  .delete((req, res, next) => {
    const { book_id } = req.params
    BooksService.deleteBook(
      req.app.get('db'),
      book_id
    )
      .then(numRowsAffected => {
        logger.info(`Book with id ${book_id} deleted.`)
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = booksRouter
