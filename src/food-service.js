const FoodService = {
    getAllFood(knex){
        // return 'all the fooooods!!'
   return knex.select('*').from('food');
   
    },
    insertFood(knex, newEntry){
        return knex
        .insert(newEntry)
        .into('food')
        .returning('*')
        .then((food) =>{
return food[0];
        });
    },
    getById(knex, id) {
        return knex.select('*').from('food').where('id', id).first();

    },
    delete (knex, id){
        return knex('food')
        .where({
            id,
        })
        .delete();
    }
}

module.exports = FoodService