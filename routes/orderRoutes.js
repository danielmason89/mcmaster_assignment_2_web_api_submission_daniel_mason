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

// 1. POST /api/orders - for placing a new pizza order
// 2. GET /api/orders - for listing all pizza orders
router.route("/")
      .post(createOrder)
      .get(getAllOrders);

// 3. GET /api/orders/:orderId - for retrieving a specific pizza order
// 4. PUT /api/orders/:orderId - for modifying an existing pizza order
// 5. DELETE /api/orders/:orderId - for cancelling an existing pizza order
router.route("/:orderId")
      .get( getSingleOrder)
      .put( updateOrder )
      .delete( deleteOrder )

// 6. POST /api/orders/:orderId/complete - for marking an order as completed
router.post('/:orderId/complete', completeOrder);

export default router;