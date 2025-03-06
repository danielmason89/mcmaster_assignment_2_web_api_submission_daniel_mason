import express from "express";
import {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  completeOrder
} from "../controllers/orderController.js";

const router = express.Router();

// 1. POST /api/orders
router.post('/', createOrder);

// 2. GET /api/orders
router.get('/', getAllOrders);

// 3. GET /api/orders/:orderId
// 4. PUT /api/orders/:orderId
// 5. DELETE /api/orders/:orderId
router.route("/:orderId")
      .get( getSingleOrder)
      .put( updateOrder )
      .delete( deleteOrder )

// 6. POST /api/orders/:orderId/complete
router.post('/:orderId/complete', completeOrder);

export default router;