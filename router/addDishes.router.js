import { Router } from "express";
import {
    addDishes,
    allDishes,
    updateDishes,
    deleteDishes,
    getDishes,
  } from "../controller/Dishes.controller.js";
import { middleWareAdmin } from "../midlleware/middleWareAdmin.js";

const router = Router();


router.route("/Dishes").get(allDishes).post(middleWareAdmin,addDishes);
router
  .route("/Dishes/:id")
  .put(updateDishes)
  .delete(deleteDishes)
  .get(getDishes);

export default router;