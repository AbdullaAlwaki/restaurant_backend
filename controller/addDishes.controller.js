const { addDishesModel } = require("../models/addDishes.models.js");

exports.addDishes = async (req, res) => {
  try {
    const { name, images, category, price, description, isVeg } = req.body;
    const addDishes = await addDishesModel.create({
      name,
      images,
      category,
      price,
      description,
      isVeg,
    });
    res.status(200).json({ addDishes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.allDishes = async (req, res) => {
  try {
    const dishes = await addDishesModel.find({});
    res.status(200).json({ dishes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteDishes = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await addDishesModel.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send("Dishes deleted");
    }
    throw new Error("Dishes not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.updateDishes = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, images, category, price, description, isVeg } = req.body;
    const updated = await addDishesModel.findByIdAndUpdate(
      id,
      {
        name,
        images,
        category,
        price,
        description,
        isVeg,
        changAt: new Date(),
      },
      { new: true }
    );
    if (updated) {
      return res.status(200).json({ updated });
    }
    throw new Error("Dishes not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getDishes = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dishes = await addDishesModel.findById(id);
    if (dishes) {
      return res.status(200).json({ dishes });
    }
    throw new Error("Dishes not found");
  } catch (error) {
    next(error);
  }}