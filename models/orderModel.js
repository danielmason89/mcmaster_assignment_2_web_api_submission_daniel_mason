/**
 * This file simulates a database or data model layer.
 * It reads from 'orders.json' at startup and writes back to 'orders.json'
 * whenever changes are made, providing "semi-persistent" storage.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ordersFilePath = path.join(__dirname, '../orders.json');

/**
 * In-memory array to store orders.
 * We'll try to load any existing data from orders.json.
 */
const orders = [];

// Load existing data from orders.json at startup, (if the file exists)
try {
  const fileData = fs.readFileSync(ordersFilePath, 'utf-8');
  const parsedData = JSON.parse(fileData);

  if (Array.isArray(parsedData)) {
    orders.push(...parsedData);
  }
} catch (err) {
  console.error('Error reading orders.json (or file not found). Using empty array.');
}

/**
 * Helper function: Saves the current `orders` array back to orders.json.
 */
function saveOrdersToFile() {
  try {
    fs.writeFileSync(
      ordersFilePath,
      JSON.stringify(orders, null, 2),
      'utf-8'
    );
    console.log("Orders saved to", ordersFilePath);
  } catch (error) {
    console.error("Error writing to orders.json:", error);
  }
}

/**
 * Create an order in the in-memory array, (and persist to file).
 */
export function createOrder(data) {
  const { size, toppings, quantity } = data;

  // Basic validation
  if (!size || !Array.isArray(toppings) || typeof quantity !== 'number') {
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

  // Write changes to disk
  saveOrdersToFile();

  return { order: newOrder };
}

/**
 * Retrieve an order by ID.
 */
export function getOrder(orderId) {
  return orders.find(o => o.orderId === orderId);
}

/**
 * Update an order by ID, (and persist to file).
 */
export function updateOrder(orderId, data) {
  const orderIndex = orders.findIndex(o => o.orderId === orderId);
  if (orderIndex === -1) return { order: null }; // Not found

  const { size, toppings, quantity } = data;

  // Basic validation for updated fields
  if (size && typeof size !== 'string') return { error: 'Invalid size' };
  if (toppings && !Array.isArray(toppings)) return { error: 'Invalid toppings' };
  if (quantity && typeof quantity !== 'number') return { error: 'Invalid quantity' };

  // Update only provided fields
  if (size) orders[orderIndex].size = size;
  if (toppings) orders[orderIndex].toppings = toppings;
  if (quantity) orders[orderIndex].quantity = quantity;

  // Write changes to disk
  saveOrdersToFile();

  return { order: orders[orderIndex] };
}

/**
 * Delete an order by ID, (and persist to file).
 */
export function deleteOrder(orderId) {
  const orderIndex = orders.findIndex(o => o.orderId === orderId);
  if (orderIndex === -1) return null;

  orders.splice(orderIndex, 1);

  // Write changes to disk
  saveOrdersToFile();

  return true;
}

/**
 * Complete an order by ID, (and persist to file).
 * Returns an order summary with totalPrice, then removes it from active orders.
 */
export function completeOrder(orderId) {
  const orderIndex = orders.findIndex(o => o.orderId === orderId);
  if (orderIndex === -1) return null;

  const orderToComplete = orders[orderIndex];

  // Example price calculation
  const basePrices = { small: 8, medium: 10, large: 12 };
  const toppingPrice = 1;
  const sizePrice = basePrices[orderToComplete.size] || 0;
  const totalPrice =
    (sizePrice + orderToComplete.toppings.length * toppingPrice)
    * orderToComplete.quantity;

  // Remove from active orders
  orders.splice(orderIndex, 1);

  // Write changes to disk
  saveOrdersToFile();

  return {
    ...orderToComplete,
    totalPrice,
    message: 'Order completed'
  };
}

export default orders;
