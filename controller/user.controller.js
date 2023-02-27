import User from "../models/user.models.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";

import { Token } from "../models/token.models.js";
import { transporter } from "../midlleware/auth.middleware.js";
import { verify_message } from "../helper/template.js";

// get all Users
export async function getUsers(req, res, next) {
  try {
    const result = await User.find();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

// get User by ID
export async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found!" });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// update User
export async function updateUser(req, res, next) {
  try {
    let updatedUser;

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { ...req.body, password: hashedPassword },
        { new: true }
      );
    } else {
      updateUser = await User.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true }
      );
    }

    res
      .status(200)
      .json({ message: "User updated successfully!", data: { updatedUser } });
  } catch (error) {
    next(error);
  }
}

// delete User
export async function deleteUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found!" });
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (e) {
    next(e);
  }
}

//------signUp------------

export const signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirm } = req.body;

    if (!firstName || !lastName || !email || !password || !confirm) {
      return res
        .status(400)
        .json({
          message: `Please fill out the required (*) fields for sign-up!`,
        });
    }

    const foundUser = await User.findOne({ email });

    if (foundUser)
      return res.status(203).json({ message: "you already in our app" });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      confirm,
    });

    let token;
    if (user) {
      token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: "1d",
      });
    }

    const verification_token = await Token.create({
      id: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    //verify link that will send to new user's email address. e.g.    http://localhost:5000/api/verify/userid/verificationtoken
    const verifyLink = `${process.env.BASE_URL}/api/verify/${user._id}/${verification_token.token}`;

    //send email to new user

    await transporter
      .sendMail({
        from: `MERN ${process.env.EMAIL}`,
        to: email,
        subject: "Welcome to our App!",
        html: verify_message(verifyLink, firstName + " " + lastName),
      })
      .catch((err) => {
        console.log(err);
      });

    res
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      })
      .json({ message: "you signUp successfully", token: token, user: user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//--------signIn---------

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).send({ error: "email or password invalid" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).send({ error: "This User doesn't exist" });
    }

    if (user && (await user.checkPassword(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: "1d",
      });
      res
        .cookie("access_token", token, {
          httpOnly: true,
          // secure : process.env.NODE_ENV == "dev"? false : true,
          // sameSite: 'none',
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        })
        .send({
          message: "you login successfully",
          token: token,
          user: user,
        });
    } else {
      res
        .status(401)
        .json({
          error: "Username or Password is not valid or u r not in our app",
        });
    }
  } catch (error) {
    next(error);
  }
};

//--------logout---------

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "you logout successfully" });
  } catch (error) {
    next(error);
  }
};

//--------verify---------
export const verify = async (req, res, next) => {
  try {
    const { id, token } = req.params;

    //check the id and token in the database
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found!" });

    const tokenInDB = await Token.findOne({ id: id, token: token });
    if (!tokenInDB)
      return res.status(404).json({ message: "Token not found!" });

    //update the user's status to verified
    await User.findByIdAndUpdate(id, { isVerified: true }, { new: true });
    await Token.findByIdAndDelete(tokenInDB._id);

    res.status(200).json({ message: "User verified successfully!" });
  } catch (error) {
    next(error);
  }
};

//-----------------forgot password-----------------

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    //check if the email is in the database
    const check = await User.findOne({ email });
    if (!check) return res.status(404).json({ message: "Email not found!" });

    //create a reset token
    const reset_token = await Token.create({
      id: check._id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    //reset link that will send to user's email address. e.g.    http://localhost:5000/api/reset/userid/resettoken
    const resetLink = `${process.env.BASE_URL}/api/reset/${check._id}/${reset_token.token}`;

    //send email to user
    await transporter.sendMail({
      from: `MERN ${process.env.EMAIL}`,
      to: email,
      subject: "Reset your password",
      html: reset_message(resetLink, check.name),
    });

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    next(error);
  }
};
