const router = require('express').Router();
const { addDishes, allDishes } = require('../controller/user.controller');


router.route('/addDishes').get(allDishes).post(addDishes);


exports.router = router;
