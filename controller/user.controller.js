import UserModel from '../models/user.models.js';
import jwt from 'jsonwebtoken';
import authToken from '../helper/generateToke.js';
import { comparePass, hashedPasswordFun } from '../lib/auth.js';

// add a new User
export async function addUser(req, res, next) {
  try {
    const user = new UserModel(req.body);
    await user.save();
    if (!user) return res.status(404).json({ message: 'User not added!' });
    res.status(200).json({ message: 'User added successfully!' });
  } catch (e) {
    next(e);
  }
}

// get all Users
export async function getUsers(req, res, next) {
  try {
    const result = await UserModel.find();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

// get User by ID
export async function getUser(req, res, next) {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found!' });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// update User
export async function updateUser(req, res, next) {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// delete User
export async function deleteUser(req, res, next) {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found!' });
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (e) {
    next(e);
  }
}

//------signUp------------

export const signUp = async (req, res, next) => {
  try {
    const {firstName,lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res
        .status(401)
        .json({ message: 'you should signUp your firstName,lastName,email and password' });
    }

    const foundUser = await UserModel.findOne({ email });

    if (foundUser)
      return res.status(203).json({ message: 'you already in our app' });

    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      password: password,
    });

    const payload = { id: newUser._id };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });

    console.log("hi");

    res
    .status(201)
      .cookie('access_token', token, { httpOnly: true })
      .json({ message: 'you signUp successfully' });
  } catch (error) {
    console.log(error)
    next(error);

  }
};

//--------login---------

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .json({ message: 'you should login your email and password' });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'you are not in our app' });
    }

    if (await comparePass(password, user.password)) {
      const token = await authToken.generateToken(user);

      res
        .cookie('access_token', token, {
          httpOnly: true,
          maxAge: 3600000 * 5,
          secure: true,
          sameSite: 'none',
        })
        .json({ message: 'you logged in successfully' });
      return;
    }
    res.status(403).json({ message: 'make sure of your password and/or email' });
  } catch (error) {
    next(error);
  }
};
