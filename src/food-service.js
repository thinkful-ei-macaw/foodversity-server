const FoodsService = {
    getAllFoods(knex) {
      return knex.select('*').from('foods');
    },
  
    insertFood(knex, newFood) {
      return knex
        .insert(newFood)
        .into('foods')
        .returning('*')
        .then((food) => {
          return food[0];
        });
    },
  
    getById(knex, id) {
      return knex.select('*').from('foods').where('id', id).first();
    },
  
    deleteFood(knex, id) {
      return knex('foods')
        .where({
          id,
        })
        .delete();
    },
  
    updateFood(knex, id, newfoodFields) {
      return knex('foods')
        .where({
          id,
        })
        .update(newFoodFields);
    },
  };
  
  module.exports = FoodsService;
  