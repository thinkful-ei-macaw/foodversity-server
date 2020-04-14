const express = require('express');
const jsonParser = express.json();
const daysRouter = express.Router();
const path = require('path');
const daysService = require('./days-service');
// days need to have {
//     id:
//     title:
//     content:
// }

const serializeDays = (days) =>({
    id: days.id,
    title: days.title,
})

daysRouter
.route('/')