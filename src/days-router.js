const express = require('express');
const jsonParser = express.json();
const daysRouter = express.Router();

// days need to have {
//     id:
//     title:
//     content:
// }