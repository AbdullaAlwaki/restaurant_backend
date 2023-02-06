import { OrderModel } from '../models/order.models.js';

export const createOrder = async (req, res, next) => {
  try {
    const newOrder = await OrderModel.create({
      created: req.body.created,
      quantity: req.body.quantity,
      order: req.body.order,
      user: req.body.user,
    });
    res.status(200).json({ message: 'order created', newOrder });
  } catch (error) {
    next(error);
  }
};

export async function allOrders(req, res) {
  try {
    const order = await OrderModel.find({});
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.findById(id);
    if (order) {
      return res.status(200).json({ order });
    }
    throw new Error('Order not found');
  } catch (error) {
    next(error);
  }
};

export async function deleteOrders(req, res) {
  try {
    const { id } = req.params;
    const remove = await OrderModel.findByIdAndDelete(id);
    if (remove) {
      return res.status(200).send('Order has been terminated!!');
    }
    throw new Error('No Order with this Id');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const orderByUser = async (req, res, next) => {
  try {
    const ordersByUser = await OrderModel.find({
      userId: req.params.uid,
    }).populate(['order', 'user']);
    if (!ordersByUser.length) {
      return res.status(404).json({ message: 'no order with this id' });
    }
    res.status(200).json(ordersByUser);
  } catch (error) {
    next(error);
  }
};
