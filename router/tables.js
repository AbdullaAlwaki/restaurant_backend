import express from 'express';

const router = express.Router();
import {
  addTable,
  deleteTable,
  updateTable,
  getTable,
  getTables,
} from '../controller/table.controller';

router.route('/').post(addTable).get(getTables);

router.route('/:id').get(getTable).put(updateTable).delete(deleteTable);

export default router;
