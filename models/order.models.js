import mongoose, { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
  created: { type: Date, default: Date.now },
  quantity: { type: Number, required: true },
  order: [
    {
      ref: 'addDishes',
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  user: [
    {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
    },
  ],

  comments: { type: [{ text: String, author: String }] },
});

export const OrderModel = model('Order', OrderSchema);
