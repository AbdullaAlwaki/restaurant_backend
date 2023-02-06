import { Schema, model } from 'mongoose';

const AddressSchema = new Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: Number,
    required: true,
  },
});

export const AddressModel = model('Address', AddressSchema);
