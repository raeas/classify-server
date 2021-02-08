const express = require('express')
const logger = require('../logger')
const path = require('path')
const CategoriesService = require('./categories-service')
const categoriesRouter = express.Router()
//use the express.json() middleware to parse the body of request
const bodyParser = express.json()

categoriesRouter
  .route('/api/categories')
  .get((req, res, next) => {
    CategoriesService.getAllCategories(req.app.get('db'))
      .then(category => {
        res.json(category)
      })
      .catch(next)
  })

categoriesRouter
  .route('/api/categories/:category_id')
  .all((req, res, next) => {
    const { category_id } = req.params
    //update tests for getCategoryById
    CategoriesService.getCategoryById(req.app.get('db'), category_id)
      .then(category => {
        if (!category) {
          logger.error(`Category with id ${category_id} not found.`)
          return res.status(404).json({
            error: { message: `Category Not Found` }
          })
        }
        res.category = category
        next()
      })
    .catch(next)
})
.get((req, res) => {
  res.json(res.category)
})

//needs tests added
categoriesRouter
  .route('/api/subcategories')
  .get((req, res, next) => {
    CategoriesService.getAllSubcategories(req.app.get('db'))
      .then(subcategory => {
        res.json(subcategory)
      })
      .catch(next)
  })

categoriesRouter
  .route('/api/catsandsubcats')
  .get((req, res, next) => {
    CategoriesService.getCatsAndSubcats(req.app.get('db'))
      .then(category => {
        res.json(category)
      })
      .catch(next)
  })
module.exports = categoriesRouter