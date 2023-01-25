const { TableModel } = require('../models/table.models');

// add a new Table
exports.addTable = async (req, res, next) => {
  try {
    const table = new TableModel(req.body);
    await table.save();
    res.status(200).json(table);
  } catch (e) {
    next(e);
  }
};

// get all Tables
exports.getTables = async (req, res, next) => {
  try {
    const result = await TableModel.find();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// get Table by ID
exports.getTable = async (req, res, next) => {
  try {
    const table = await TableModel.findById(req.params.id);
    res.status(200).json(table);
  } catch (error) {
    next(error);
  }
};

// update Table
exports.updateTable = async (req, res, next) => {
  try {
    const table = await TableModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(table);
  } catch (e) {
    next(e);
  }
};

// delete Table
exports.deleteTable = async (req, res, next) => {
  try {
    const table = await TableModel.findByIdAndDelete(req.params.id);
    if(!table) return res.status(404).json({ msg: 'Table not found!' });
    res.status(200).json({ msg: 'Table deleted successfully!'});
  } catch (e) {
    next(e);
  }
};


