import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';


const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please provide firstname"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide lastname"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: [true, "This email is already in use"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [5, "The password should contains 5 characters at least"],
    select: false,
  },
  confirm: {
    type: String,
    required: [true, "Please provide a password"],
      minlength: [5, "The password should contains 5 characters at least"],
      validate: {
          validator: function (confirm) {
              return confirm === this.password
          },
          message: 'Passwords are not matched!'
    }
  },
    isVerified: {
      type: Boolean,
      default: false,
    }
  ,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  // address: AddressSchema,
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
  try {
      if (!this.isModified('password')) return next();

      //hash the password
      this.password = await bcrypt.hash(this.password, 12);
      this.confirm = undefined;

      next();

  } catch (error) {
      next(error)
  }
});


/** check the password */
UserSchema.methods.checkPassword = async (textPassword, hashedPassword) => {
  try {
      return await bcrypt.compare(textPassword, hashedPassword)
  } catch (error) {
      next(error)
  }
}

UserSchema.methods.changedPass = function (jwt_ts) {
  if (this.changedAt) {
      const changed_ts = this.changedAt.getTime() / 1000;
      //token generated before password change
      return jwt_ts < changed_ts  
  }

  return false;
}
const User = model('User', UserSchema);
export default User;
