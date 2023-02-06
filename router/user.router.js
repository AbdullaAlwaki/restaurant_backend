import { Router } from 'express';
import {
  addDishes,
  allDishes,
  updateDishes,
  deleteDishes,
  getDishes,
} from '../controller/addDishes.controller.js';
import {
  allOrders,
  createOrder,
  deleteOrders,
  getOrder,
  orderByUser,
} from '../controller/orders.controller.js';
import {
  addTable,
  deleteTable,
  updateTable,
  getTable,
  getTables,
} from '../controller/table.controller.js';

const router = Router();

router.route('/addDishes').get(allDishes).post(addDishes);
router
  .route('/addDishes/:id')
  .put(updateDishes)
  .delete(deleteDishes)
  .get(getDishes);
router.route('/bookTable').post(addTable).get(getTables);
router
  .route('/bookTable/:id')
  .get(getTable)
  .put(updateTable)
  .delete(deleteTable);

router.route('/orders').post(createOrder).get(allOrders);
router.route('/orders/:id').get(getOrder).delete(deleteOrders);
router.get('/orderByUser/:uid', orderByUser);

export default router;
