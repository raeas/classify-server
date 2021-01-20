const BooksService = {
  getAllBookmarks(knex) {
    return knex.select('*').from('books')
  },
  getById(knex, id) {
    return knex.from('books').select('*').where('id', id).first()
  },
  insertBookmark(knex, newBookmark) {
    return knex
      .insert(newBook)
      .into('books')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  deleteBookmark(knex, id) {
    return knex('books')
      .where({ id })
      .delete()
  },
  updateBookmark(knex, id, newBookFields) {
    return knex('books')
      .where({ id })
      .update(newBookFields)
  },
}

module.exports = BooksService