const mongoose = require("mongoose")

const TableSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  persons: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

exports.TableModel = mongoose.model('Table', TableSchema);

