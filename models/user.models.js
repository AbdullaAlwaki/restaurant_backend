import { Schema, model } from 'mongoose';
// import { AddressSchema } from './address.model.js';

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // address: AddressSchema,
});


const UserModel = model('User', UserSchema);
export default UserModel; 
