const DaysService = {
    getAllDays(knex) {
      return knex.select('*').from('days');
    },
  
    insertDay(knex, newDay) {
      return knex
        .insert(newDay)
        .into('days')
        .returning('*')
        .then((day) => {
          return day[0];
        });
    },
  
    getByDayId(knex, id) {
      return knex.from('days').select('*').where('id', id).first();
    },
  
    deleteDay(knex, id) {
      return knex('days')
        .where({
          id,
        })
        .delete();
    },
  
    updateDay(knex, id, newDayFields) {
      return knex('days')
        .where({
          id,
        })
        .update(newDayFields);
    },
  };
  
  module.exports = DaysService;
  