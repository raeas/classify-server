const express = require('express')
const logger = require('../logger')
const xss = require('xss')
const path = require('path')
const BookshelfService = require('./bookshelf-service')
const bookshelfRouter = express.Router()
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

  module.exports = bookshelfRouter