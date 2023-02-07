import { Router } from "express";
import {
    addDishes,
    allDishes,
    updateDishes,
    deleteDishes,
    getDishes,
  } from "../controller/addDishes.controller.js";

const router = Router();


router.route("/addDishes").get(allDishes).post(addDishes).delete(deleteDishes);
router
  .route("/addDishes/:id")
  .put(updateDishes)
  .delete(deleteDishes)
  .get(getDishes);

export default router;