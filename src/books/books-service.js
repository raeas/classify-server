const BooksService = {
  getAllBooks(knex) {
    return knex.select('*').from('books')
  },

  // getBookshelf(knex) {
  //   return knex.select('books.id', 'books.title', 'books.author_last', 'books.author_first', 'books.description', 'categories.name as category', 'subcategories.name as subcategory' )
  //   .from ('books')
  //   .join('categories','books.category_id', '=', 'categories.id')
  //   .join('subcategories', 'books.subcategory_id', '=', 'subcategories.id') 
  // },

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