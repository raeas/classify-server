const CategoriesService = {
  getAllCategories(knex) {
    return knex.select('*').from('categories')
  },
  getCategoryById(knex, id) {
    return knex.from('categories').select('*').where('id', id).first()
  },
  getAllSubcategories(knex) {
    return knex.select('*').from('subcategories')
  },
  getCatsAndSubcats(knex) {
    return knex.select('categories.id as category_id', 'subcategories.id  as subcategory_id', 'categories.name as category', 'subcategories.name as subcategory' )
    .from ('categories')
    .join('subcategories','category', '=', 'categories.id') 
  },
}

module.exports = CategoriesService