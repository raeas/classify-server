const BooksService = {
  getAllBooks(knex) {
    return knex.select('*').from('books')
  },
  getById(knex, id) {
    return knex.from('books').select('*').where('id', id).first()
  },
  insertBook(knex, newBook) {
    return knex
      .insert(newBook)
      .into('books')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  deleteBook(knex, id) {
    return knex('books')
      .where({ id })
      .delete()
  },
  updateBook(knex, id, newBookFields) {
    return knex('books')
      .where({ id })
      .update(newBookFields)
  },
}

module.exports = BooksService