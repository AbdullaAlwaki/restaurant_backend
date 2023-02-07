import { Router } from "express";

import {
  allOrders,
  createOrder,
  deleteOrders,
  getOrder,
  orderByUser,
} from "../controller/orders.controller.js";
import { addUser, deleteUser, getUser, getUsers, updateUser } from "../controller/user.controller.js";

const router = Router();

// User routes
router.route("/users").post(addUser).get(getUsers);
router.route("/users/:id").get(getUser).put(updateUser).delete(deleteUser);

// Order routes
router.route("/orders").post(createOrder).get(allOrders);
router.route("/orders/:id").get(getOrder).delete(deleteOrders);
router.get("/orderByUser/:uid", orderByUser);

export default router;
