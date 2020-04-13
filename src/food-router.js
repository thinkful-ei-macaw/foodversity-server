const express=require('express');
const foodRouter = express.Router();

// food only has {
//     content:
//     days_id: which day it belongs to
// }
const serializeFood = (food) => ({
    id: food.id,
    content: food.content,
    days_id: Number(food.days_id),
});

foodRouter
.route('/main')
.get((req, res, next)=> {
    FoodService
    .getAllFood(req.app.get('db'))
.then((food)=> {
    res.json(food.map(serializeFood));

})
.catch(next);
})
.post(jsonParser, (req, res, next) =>{
    req.app.get('db');

    const {id, content, days_id } = req.body;
    const food = {
        content,
        days_id,
    };
    if(id) food.id = id;

    FoodService.insertFood(req.app.get('db'), food)
    .then((food) => {
        return res.json(food);
    })
    .catch(next);
});

//update, delete, later

module.exoports = foodRouter;

