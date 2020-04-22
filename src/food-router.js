const express = require("express");
const jsonParser = express.json();
const foodsRouter = express.Router();
const FoodsService = require("./food-service.js");

// food only has {
//     content:
//     days_id: which day it belongs to
// }
const serializeFoods = (food) => ({
  id: food.id,
  content: food.content,
  meal_type: food.meal_type,
  second_item: food.second_item,
  third_item: food.third_item,
  url: food.url,
  days_id: Number(food.days_id),
  // meal_id: Number(food.meal_id),
});

foodsRouter
  .route("/")
  .get((req, res, next) => {
    FoodsService.getAllFoods(req.app.get("db"))
      .then((foods) => {
        res.json(foods.map(serializeFoods));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    req.app.get("db");

    const {
      content,
      days_id,
      meal_type,
      second_item,
      third_item,
      url,
    } = req.body;
    const food = {
      content,
      days_id,
      meal_type,
      second_item,
      third_item,
      url,
    };

    FoodsService.insertFood(req.app.get("db"), food)
      .then((food) => {
        return res.json(food);
      })
      .catch(next);
  });

//update, delete, later
foodsRouter
  .route("/:id")
  .get((req, res, next) => {
    const { id } = req.params;

    FoodsService.getById(req.app.get("db"), id)
      .then((food) => {
        if (food) {
          return res.status(200).json(food);
        } else {
          return res.status(404).send("food not found");
        }
      })
      .catch(next);
  })
  .patch((req, res, next) => {
    const { id, content } = req.body;

    const foodToUpdate = {
      id,

      content,
    };

    if (!title) {
      return res.status(404).json({ error: "must include title" });
    }

    if (!content) {
      return res.status(404).json({
        error: "must include content",
      });
    }

    FoodsService.updateFood(req.app.get("db"), foodToUpdate)
      .then((foodToUpdate) => {
        res.json(foodToUpdate);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    console.log(req.params.id);

    FoodsService.deleteFood(req.app.get("db"), req.params.id)
      .then(() => {
        res.status(204).json({});
      })
      .catch(next);
  });

module.exports = foodsRouter;
