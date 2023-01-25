const mongoose = require("mongoose")
const addDishesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    images: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    
    isVeg: { type: Boolean, required: true },
},
{
    timestamps: true,
});

exports.addDishesModel = mongoose.model("addDishes", addDishesSchema);