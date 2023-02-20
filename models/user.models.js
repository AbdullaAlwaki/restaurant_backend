import { Schema, model } from 'mongoose';
import { hashedPasswordFun } from '../lib/auth.js';

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  zip: {
    type: Number,
    required: false,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await hashedPasswordFun(this.password);
  next();
});

const UserModel = model('User', UserSchema);
export default UserModel;
