const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const path = require('path');

const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

let orders = [];

// Routes

// 1. POST /api/orders - Create a new order
app.post('/api/orders', (req, res) => {
  const { size, toppings, quantity } = req.body;

  // Basic validation
  if (!size || !Array.isArray(toppings) || !quantity) {
    return res.status(400).json({ error: 'Invalid order data' });
  }

  const newOrder = {
    orderId: uuidv4(),
    size,
    toppings,
    quantity,
    status: 'order in-progress'
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// 2. GET /api/orders - List all orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// 3. GET /api/orders/:orderId - Retrieve a specific order
app.get('/api/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const order = orders.find(o => o.orderId === orderId);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

// 4. PUT /api/orders/:orderId - Update an order
app.put('/api/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const { size, toppings, quantity } = req.body;

  const orderIndex = orders.findIndex(o => o.orderId === orderId);
  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  // Update fields
  if (size) orders[orderIndex].size = size;
  if (Array.isArray(toppings)) orders[orderIndex].toppings = toppings;
  if (quantity) orders[orderIndex].quantity = quantity;

  res.json(orders[orderIndex]);
});

// 5. DELETE /api/orders/:orderId - Cancel (delete) an order
app.delete('/api/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const orderIndex = orders.findIndex(o => o.orderId === orderId);

  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }
  // remove the order from the array
  orders.splice(orderIndex, 1);
  // 204 No Content
  res.status(204).send();
});

// 6. POST /api/orders/:orderId/complete - Mark order as completed
app.post('/api/orders/:orderId/complete', (req, res) => {
  const { orderId } = req.params;
  const orderIndex = orders.findIndex(o => o.orderId === orderId);

  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  // Simulate order completion:
  const orderToComplete = orders[orderIndex];

  // For example, calculate total price:
  // (This is arbitrary—adjust or remove as needed.)
  const basePrices = {
    small: 8,
    medium: 10,
    large: 12
  };
  const toppingPrice = 1; // each topping costs $1 extra
  const sizePrice = basePrices[orderToComplete.size] || 0;
  const totalPrice =
    (sizePrice + orderToComplete.toppings.length * toppingPrice) *
    orderToComplete.quantity;

  // Remove from in-memory store
  orders.splice(orderIndex, 1);

  // Return an order summary
  const orderSummary = {
    ...orderToComplete,
    totalPrice,
    message: 'Order completed.'
  };

  res.json(orderSummary);
});

// Catch-all for 404
app.use((req, res) => {
  res.status(404).sendFile(__dirname + '/public/notfound.html');
});

app.listen(4000, () => {
    console.log('listening on port 3000');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
