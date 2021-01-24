const logger = require('../logger')

const NO_ERRORS = null

function getBooksValidationError({ title }) {
  if (!title)
  {
    logger.error(`Invalid rating '${rating}' supplied`)
    return {
      error: {
        message: `'title' is required`
      }
    }
  }

  return NO_ERRORS
}

module.exports = {
  getBooksValidationError,
}