import { Router } from "express";

import {
    addTable,
    deleteTable,
    updateTable,
    getTable,
    getTables,
  } from "../controller/table.controller.js";
  
const router = Router();

// Table routes
router.route("/table").post(addTable).get(getTables);
router
  .route("/table/:id")
  .get(getTable)
  .put(updateTable)
  .delete(deleteTable);

export default router;