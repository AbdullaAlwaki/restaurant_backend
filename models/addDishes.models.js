import { Schema, model } from "mongoose";
const addDishesSchema = new Schema({
    name: { type: String, required: true },
    images: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    isVeg: { type: Boolean, required: true },
    isOffers: { type: Boolean, required: true },
    isFavorites: { type: Boolean, required: true },
},
{
    timestamps: true,
});

export const addDishesModel = model("addDishes", addDishesSchema);