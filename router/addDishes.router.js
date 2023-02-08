import { Router } from "express";
import {
    addDishes,
    allDishes,
    updateDishes,
    deleteDishes,
    getDishes,
  } from "../controller/Dishes.controller.js";

const router = Router();


router.route("/Dishes").get(allDishes).post(addDishes);
router
  .route("/Dishes/:id")
  .put(updateDishes)
  .delete(deleteDishes)
  .get(getDishes);

export default router;