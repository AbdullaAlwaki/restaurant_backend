import { TableModel } from '../models/table.models.js';

// add a new Table
export async function addTable(req, res, next) {
  try {
    const table = new TableModel(req.body);
    await table.save();
    res.status(200).json({ message: 'Table booked successfully!'});
  } catch (e) {
    next(e);
  }
}

// get all Tables
export async function getTables(req, res, next) {
  try {
    const result = await TableModel.find();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

// get Table by ID
export async function getTable(req, res, next) {
  try {
    const table = await TableModel.findById(req.params.id);
    res.status(200).json(table);
  } catch (error) {
    next(error);
  }
}

// update Table
export async function updateTable(req, res, next) {
  try {
    const table = await TableModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(table);
  } catch (e) {
    next(e);
  }
}

// delete Table
export async function deleteTable(req, res, next) {
  try {
    const table = await TableModel.findByIdAndDelete(req.params.id);
    if(!table) return res.status(404).json({ msg: 'Table not found!' });
    res.status(200).json({ msg: 'Table deleted successfully!'});
  } catch (e) {
    next(e);
  }
}


