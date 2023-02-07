import { addDishesModel } from "../models/addDishes.models.js";

export async function addDishes(req, res) {
  try {
    const { name, images, category, price, description, isVeg, isOffers, isFavorites } = req.body;
    const addDishes = await addDishesModel.create({
      name,
      images,
      category,
      price,
      description,
      isVeg,
      isOffers,
      isFavorites,
    });
    res.status(200).json({ message: "Dishes added" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function allDishes(req, res) {
  try {
    const dishes = await addDishesModel.find({});
    res.status(200).json({ dishes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export async function deleteDishes(req, res) {
  try {
    const { name } = req.body;
    const deleted = await addDishesModel.find({ name }).deleteOne();
    if (deleted) {
      return res.status(200).send({message :"Dishes deleted"});
    }
    return res.status(404).send({error: "Dishes not found"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateDishes(req, res) {
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

export async function getDishes(req, res, next) {
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