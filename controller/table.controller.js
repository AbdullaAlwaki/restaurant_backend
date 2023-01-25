import TableModel from '../models/table.models.js';

// add a new Table
export const addTable = async (req, res, next) => {
  try {
    const table = new TableModel(req.body);
    await table.save();
    res.status(200).json(record);
  } catch (e) {
    next(e);
  }
};

// get all Tables
export const getTables = async (req, res, next) => {
  try {
    const result = await TableModel.find();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// get Table by ID
export const getTable = async (req, res, next) => {
  try {
    const table = await TableModel.findById(req.params.id);
    res.status(200).json(table);
  } catch (error) {
    next(error);
  }
};

// update Table
export const updateTable = async (req, res, next) => {
  try {
    const table = await TableModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(record);
  } catch (e) {
    next(e);
  }
};

// delete Table
export const deleteTable = async (req, res, next) => {
  try {
    const table = await TableModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Table deleted!' });
  } catch (e) {
    next(e);
  }
};
