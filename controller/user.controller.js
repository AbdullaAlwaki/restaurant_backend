import UserModel from "../models/user.models.js";

// add a new User
export async function addUser(req, res, next) {
  try {
    const user = new UserModel(req.body);
    await user.save();
    if(!user) return res.status(404).json({ msg: "User not added!" });
    res.status(200).json({ message: "User added successfully!" });
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
    if (!user) return res.status(404).json({ msg: "User not found!" });
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
    if (!user) return res.status(404).json({ msg: "User not found!" });
    res.status(200).json({ msg: "User deleted successfully!" });
  } catch (e) {
    next(e);
  }
}
