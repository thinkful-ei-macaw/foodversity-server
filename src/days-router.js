const express = require('express');
const jsonParser = express.json();
const daysRouter = express.Router();
const path = require('path');
const DaysService = require('./days-service');

const serializeDays = (day) =>({
    id: day.id,
    title: day.title,
});

daysRouter
.route('/:id')
.get((req, res, next)=>{
    DaysService
    // .getAllDays(req.app.get('db'))
    .getByDayId(req.app.get('db'), req.params.id)
    .then((day)=>{
        if(!day)
        return res.status(404).json({
            error: {
                message:'day does not exist...time is not linear',
            },

        });
        else {
            res.status(201).json(day);
        }
    })
    .catch(next);
})
.post((req, res, next) => {
    const { title } = req.body;
    const day = {
        title,
    };
    if (!title){
        return res.status(404).json({
            error: 'must include day',
        });
    }
    DaysService.updateDay(req.app.get('db'), day)
    .catch(next);
})

.delete((req, res, next) => {
    console.log(req.params.id)

    DaysService
    .deleteDay(req.app.get('db'), req.params.id)
    .then (() =>{
        res.status(204).end();
    })
    .catch(next);
});

daysRouter
.route('/')
.get((req, res, next) => {
    DaysService
    .getAllDays(req.app.get('db'))
    .then((days)=> {
        res.json(days.map(serializeDays));
    })
    .catch(next);
})
.post(jsonParser, (req, res, next) => {
    const { title } = req.body;
    const newDay = {
        title,
    };
    if(!title) {
        return res.status(404).json({
            error: {
                message: 'must include day'
            },
        });
    }
    newDay.title = title;

    DaysService.insertDay(req.app.get('db'), newDay).then((day) => {
        res.json(day).then((day) => {
            res.status(201).json(serializeDays(day));
        })
    })
    .catch(next);
})


module.exports= daysRouter;