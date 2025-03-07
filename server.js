import express from "express";
import orderRouter from "./routes/orderRoutes.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/orders', orderRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Pizzeria Orders API!');
});

// Catch-all for 404
app.use((req, res) => {
  res.status(404).json({ message: "Error, This path doesn't exit"})
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
