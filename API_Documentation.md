# API Documentation

POST /api/orders
POST
Create (place) a new pizza order.

GET /api/orders
GET
Retrieve (list) all pizza orders.

GET /api/orders/:orderId
GET
Retrieve a specific pizza order by its orderId.

PUT /api/orders/:orderId
PUT
Modify (update) an existing pizza order.

DELETE /api/orders/:orderId
DELETE
Cancel (delete) an existing pizza order.

POST /api/orders/:orderId/complete
POST
Mark an order as completed (and, per assignment instructions, remove it from the store and calculate/return an order summary).
