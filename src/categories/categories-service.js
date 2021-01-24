const CategoriesService = {
  getAllCategories(knex) {
    return knex.select('*').from('categories')
  },
  getById(knex, id) {
    return knex.from('categories').select('*').where('id', id).first()
  },
  getCatsAndSubcats(knex) {
    return knex.select('categories.id as category_id', 'subcategories.id  as subcategory_id', 'categories.name as category', 'subcategories.name as subcategory' )
    .from ('categories')
    .join('subcategories','category', '=', 'categories.id') 
  },
}

module.exports = CategoriesService