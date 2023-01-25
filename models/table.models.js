import mongoose from 'mongoose';

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
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const TableModel = mongoose.model('Table', TableSchema);

export default TableModel;
