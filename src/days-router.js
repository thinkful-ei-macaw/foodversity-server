const express = require('express');
const jsonParser = express.json();
const daysRouter = express.Router();
const path = require('path');
const daysService = require('./days-service');

const serializeDays = (day) =>({
    id: day.id,
    title: day.title,
});

daysRouter
.route('/:id')
.all((req, res, next)=>{
    daysService
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
.patch((req, res, next) => {
    const { title } = req.body;
    const day = {
        title,
    };
    if (!title){
        return res.status(404).json({
            error: 'must include day',
        });
    }
    daysService.updateDay(req.app.get('db'), day).catch(next);
})
.delete((req, res, next) => {
    daysService
    .deleteDay(req.app.get('db'), req.params.id)
    .then (() =>{
        res.status(204).end();
    })
    .catch(next);
});

daysRouter
.route('/')
.get((req, res, next) => {
    daysService
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

    daysService.insertDay(req.app.get('db'), newDay).then((day) => {
        res.json(day).then((day) => {
            res.status(201).json(serializeDays(day));
        })
    })
})


module.exports= daysRouter;