

exports.addDishes = async (req, res) => {
    try {
        const { name, images, category, price, description, isVeg } = req.body;
        const addDishes = await addDishes.create({ name, images, category, price, description, isVeg });
        res.status(200).json({ addDishes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.allDishes = async (req, res) => {
    try {
        const allDishes = await addDishes.find({});
        res.status(200).json({ allDishes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
    