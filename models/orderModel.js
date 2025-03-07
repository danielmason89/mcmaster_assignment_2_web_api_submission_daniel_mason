import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ordersFilePath = path.join(__dirname, '../orders.json');

const orders = [];
export default orders;
try {
  const fileData = fs.readFileSync(ordersFilePath, 'utf-8');
  const parsedData = JSON.parse(fileData);
  orders.push(...parsedData);
} catch (err) {
  console.error('Error reading orders.json:', err);
}

// Create an order
export function createOrder(data) {
  const { size, toppings, quantity } = data;
  if (!size || !Array.isArray(toppings) || !quantity) {
    return { error: 'Invalid order data' };
  }

  const newOrder = {
    orderId: uuidv4(),
    size,
    toppings,
    quantity,
    status: 'pending'
  };

  orders.push(newOrder);
  return { order: newOrder };
}

// Retrieve an order
export function getOrder(orderId) {
  return orders.find(o => o.orderId === orderId);
}

// Update an order
export function updateOrder(orderId, data) {
  const orderIndex = orders.findIndex(o => o.orderId === orderId);
  if (orderIndex === -1) return { order: null };

  const { size, toppings, quantity } = data;

  // Basic Order validation
  if (size && typeof size !== 'string') return { error: 'Invalid size' };
  if (toppings && !Array.isArray(toppings)) return { error: 'Invalid toppings' };
  if (quantity && typeof quantity !== 'number') return { error: 'Invalid quantity' };

  if (size) orders[orderIndex].size = size;
  if (toppings) orders[orderIndex].toppings = toppings;
  if (quantity) orders[orderIndex].quantity = quantity;

  return { order: orders[orderIndex] };
}

// Delete an order
export function deleteOrder(orderId) {
  const orderIndex = orders.findIndex(o => o.orderId === orderId);
  if (orderIndex === -1) return null;

  orders.splice(orderIndex, 1);
  return true;
}

// Complete an order
export function completeOrder(orderId) {
  const orderIndex = orders.findIndex(o => o.orderId === orderId);
  if (orderIndex === -1) return null;

  const orderToComplete = orders[orderIndex];

  // Example Order price calculation
  const basePrices = { small: 8, medium: 10, large: 12 };
  const toppingPrice = 1;
  const sizePrice = basePrices[orderToComplete.size] || 0;
  const totalPrice =
    (sizePrice + orderToComplete.toppings.length * toppingPrice) *
    orderToComplete.quantity;

  orders.splice(orderIndex, 1);

  return {
    ...orderToComplete,
    totalPrice,
    message: 'Order completed'
  };
}