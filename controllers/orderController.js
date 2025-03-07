import { v4 as uuidv4 } from "uuid";
import orders from "../models/orderModel.js";

// Example: could be extracted to a utility file or kept here
function calculateTotalPrice(order) {
  const basePrices = { small: 8, medium: 10, large: 12 };
  const toppingPrice = 1;
  const sizePrice = basePrices[order.size] || 0;
  return (sizePrice + order.toppings.length * toppingPrice) * order.quantity;
}

// CREATE (POST) /api/orders
export function createOrder(req, res) {
  const { size, toppings, quantity } = req.body;

  // Validate input
  if (!size || !Array.isArray(toppings) || !quantity) {
    return res.status(400).json({ error: 'Invalid order data' });
  }

  const newOrder = {
    orderId: uuidv4(),
    size,
    toppings,
    quantity,
    status: 'pending',
  };

  orders.push(newOrder);
  return res.status(201).json(newOrder);
};

// READ (GET) /api/orders
export function getAllOrders(req, res) {
  return res.json(orders);
};

// READ (GET) /api/orders/:orderId
export function getSingleOrder(req, res) {
  const { orderId } = req.params;
  const order = orders.find(o => o.orderId === orderId);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  return res.json(order);
};

// UPDATE (PUT) /api/orders/:orderId
export function updateOrder(req, res) {
  const { orderId } = req.params;
  const { size, toppings, quantity } = req.body;

  const orderIndex = orders.findIndex(o => o.orderId === orderId);
  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  // Validate input
  if (size && typeof size !== 'string') {
    return res.status(400).json({ error: 'Invalid size' });
  }
  if (toppings && !Array.isArray(toppings)) {
    return res.status(400).json({ error: 'Invalid toppings' });
  }
  if (quantity && typeof quantity !== 'number') {
    return res.status(400).json({ error: 'Invalid quantity' });
  }

  if (size) orders[orderIndex].size = size;
  if (toppings) orders[orderIndex].toppings = toppings;
  if (quantity) orders[orderIndex].quantity = quantity;

  return res.json(orders[orderIndex]);
};

// DELETE (DELETE) /api/orders/:orderId
export function deleteOrder(req, res) {
  const { orderId } = req.params;
  const orderIndex = orders.findIndex(o => o.orderId === orderId);

  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  orders.splice(orderIndex, 1);
  return res.status(204).send();
};

// COMPLETE (POST) /api/orders/:orderId/complete
export function completeOrder(req, res) {
  const { orderId } = req.params;
  const orderIndex = orders.findIndex(o => o.orderId === orderId);

  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  const orderToComplete = orders[orderIndex];
  const totalPrice = calculateTotalPrice(orderToComplete);

  // Remove from the active list
  orders.splice(orderIndex, 1);

  // Return an order summary
  return res.json({
    ...orderToComplete,
    totalPrice,
    message: 'Order completed and removed from active orders.',
  });
};