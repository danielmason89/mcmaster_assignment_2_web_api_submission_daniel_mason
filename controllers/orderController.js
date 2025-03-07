import { v4 as uuidv4 } from "uuid";
import orders from "../models/orderModel.js";

/**
 * Utility function to calculate total price
 * (Assumes base pricing by size and $1 per topping).
 */
function calculateTotalPrice(order) {
  const basePrices = { small: 8, medium: 10, large: 12 };
  const toppingPrice = 1;

  const sizePrice = basePrices[order.size] || 0;
  const total = (sizePrice + order.toppings.length * toppingPrice) * order.quantity;
  return total;
}

/**
 * POST /api/orders
 * Create a new order.
 */
export function createOrder(req, res) {
  const { size, toppings, quantity } = req.body;

  // Basic validation
  if (!size || !Array.isArray(toppings) || typeof quantity !== 'number') {
    return res.status(400).json({ error: "Invalid order data" });
  }

  const newOrder = {
    orderId: uuidv4(),
    size,
    toppings,
    quantity,
    status: "pending",
  };

  // Push to our in-memory array
  orders.push(newOrder);

  return res.status(201).json(newOrder);
}

/**
 * GET /api/orders
 * Retrieve all orders.
 */
export function getAllOrders(req, res) {
  return res.json(orders);
}

/**
 * GET /api/orders/:orderId
 * Retrieve a single order by ID.
 */
export function getSingleOrder(req, res) {
  const { orderId } = req.params;

  const order = orders.find(o => o.orderId === orderId);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  return res.json(order);
}

/**
 * PUT /api/orders/:orderId
 * Update an existing order.
 */
export function updateOrder(req, res) {
  const { orderId } = req.params;
  const { size, toppings, quantity } = req.body;

  // Find the order
  const orderIndex = orders.findIndex(o => o.orderId === orderId);
  if (orderIndex === -1) {
    return res.status(404).json({ error: "Order not found" });
  }

  // Basic checks (only validate fields that are provided)
  if (size && typeof size !== "string") {
    return res.status(400).json({ error: "Invalid size" });
  }
  if (toppings && !Array.isArray(toppings)) {
    return res.status(400).json({ error: "Invalid toppings" });
  }
  if (quantity && typeof quantity !== "number") {
    return res.status(400).json({ error: "Invalid quantity" });
  }

  // Update fields
  if (size) orders[orderIndex].size = size;
  if (toppings) orders[orderIndex].toppings = toppings;
  if (quantity !== undefined) orders[orderIndex].quantity = quantity;

  return res.json(orders[orderIndex]);
}

/**
 * DELETE /api/orders/:orderId
 * Delete an order by ID.
 */
export function deleteOrder(req, res) {
  const { orderId } = req.params;

  // Find the index
  const orderIndex = orders.findIndex(o => o.orderId === orderId);
  if (orderIndex === -1) {
    return res.status(404).json({ error: "Order not found" });
  }

  orders.splice(orderIndex, 1);
  // 204 = No Content
  return res.status(204).send();
}

/**
 * POST /api/orders/:orderId/complete
 * Mark an order as complete; return summary & remove from active list.
 */
export function completeOrder(req, res) {
  const { orderId } = req.params;

  const orderIndex = orders.findIndex(o => o.orderId === orderId);
  if (orderIndex === -1) {
    return res.status(404).json({ error: "Order not found" });
  }

  const orderToComplete = orders[orderIndex];
  const totalPrice = calculateTotalPrice(orderToComplete);

  // Remove it from active orders
  orders.splice(orderIndex, 1);

  return res.json({
    ...orderToComplete,
    totalPrice,
    message: "Order completed and removed from active orders.",
  });
}
