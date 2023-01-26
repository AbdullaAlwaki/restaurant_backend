import { Schema, model } from "mongoose";

const TableSchema = Schema({
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

export const TableModel = model('Table', TableSchema);

