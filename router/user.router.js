const router = require('express').Router();
const { addDishes, allDishes, updateDishes, deleteDishes, getDishes } = require('../controller/addDishes.controller.js');
const {addTable, deleteTable, updateTable, getTable, getTables} = require('../controller/table.controller');

router.route('/addDishes').get(allDishes).post(addDishes);
router.route('/addDishes/:id').put(updateDishes).delete(deleteDishes).get(getDishes);
router.route('/bookTable').post(addTable).get(getTables);
router.route('/bookTable/:id').get(getTable).put(updateTable).delete(deleteTable);

exports.router = router;
