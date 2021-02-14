const BookshelfService = {

  getBookshelf(knex) {
    return knex.select('books.id', 'books.title', 'books.author_last', 'books.author_first', 'books.description', 'categories.name as category', 'subcategories.name as subcategory' )
    .from ('books')
    .join('categories','books.category_id', '=', 'categories.id')
    .join('subcategories', 'books.subcategory_id', '=', 'subcategories.id') 
  },
}

module.exports = BookshelfService