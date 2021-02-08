const express = require('express')
const logger = require('../logger')
const xss = require('xss')
const path = require('path')
const BookshelfService = require('./bookshelf-service')
// const { getBooksValidationError } = require('./books-validator')
const bookshelfRouter = express.Router()
//use the express.json() middleware to parse the body of request
const bodyParser = express.json()

const serializeBook = book => ({
  id: book.id,
  title: xss(book.title),
  author_last: xss(book.author_last),
  author_first: xss(book.author_first),
  description: xss(book.description),
  category: book.category,
  subcategory: book.subcategory,
})

bookshelfRouter
  .route('/api/bookshelf')
  .get((req, res, next) => {
    BookshelfService.getBookshelf(req.app.get('db'))
      .then(books => {
        let result = books.map(book => serializeBook(book))
        res.json(result)
      })
      .catch(next)
  })

// booksRouter
//  .route('/api/books/:book_id')
//  .all((req, res, next) => {
//    const { book_id } = req.params
//    BooksService.getById(req.app.get('db'), book_id)
//      .then(book => {
//        if (!book) {
//          logger.error(`Book with id ${book_id} not found.`)
//          return res.status(404).json({
//            error: { message: `Book Not Found` }
//          })
//        }
//        res.book = book
//        next()
//      })
//      .catch(next)
//   })
//   .get((req, res) => {
//     res.json(serializeBook(res.book))
//   })

//   //How to tell which fields are "required???"
//   .patch(bodyParser, (req, res, next) => {
//     const { title, author_last, author_first, description, category_id, subcategory_id } = req.body
//     const bookToUpdate = { title, author_last, author_first, description, category_id, subcategory_id }
//     const numberOfValues = Object.values(bookToUpdate).filter(Boolean).length
    
//     if (numberOfValues === 0) {
//       logger.error(`Invalid update without required fields`)
//       return res.status(400).json({
//         error: { 
//           message: `Request body must contain either 'title', 'category_id', 'subcategory_id'`
//         }
//       })
//     }

//     const error = getBooksValidationError(bookToUpdate)

//     if (error) return res.status(400).send(error)

//     BooksService.updateBook(
//       req.app.get('db'),
//       req.params.book_id,
//       bookToUpdate
//     )
//       .then(numRowsAffected => {
//         res.status(204).end()
//       })

//       .catch(next)

//   })

//   .delete((req, res, next) => {
//     const { book_id } = req.params
//     BooksService.deleteBook(
//       req.app.get('db'),
//       book_id
//     )
//       .then(numRowsAffected => {
//         logger.info(`Book with id ${book_id} deleted.`)
//         res.status(204).end()
//       })
//       .catch(next)
//   })
  module.exports = bookshelfRouter