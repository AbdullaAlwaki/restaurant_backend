import { Router } from 'express';

import {
  allOrders,
  createOrder,
  deleteOrders,
  getOrder,
  orderByUser,
} from '../controller/orders.controller.js';
import {
  deleteUser,
  getUser,
  getUsers,
  signin,
  signUp,
  updateUser,
  logout,
  verify
} from '../controller/user.controller.js';
import { middleWareAdmin } from '../midlleware/middleWareAdmin.js';


const router = Router();

router.post('/signup', signUp);
router.post('/signin', signin);


// User routes
router.route('/users').get(/* middleWareAdmin, */getUsers);
router.route('/users/:id').get(/* middleWareAdmin, */getUser).put(/* middleWareAdmin, */updateUser).delete(/* middleWareAdmin, */deleteUser);

// Verification routes
router.route("/verify/:id/:token")
.get(verify);

// Order routes
router.route('/orders').post(createOrder).get(allOrders);
router.route('/orders/:id').get(getOrder).delete(deleteOrders);
router.get('/orderByUser/:uid', orderByUser);

export default router;
