# API Documentation

Running the Project
Install dependencies (if not already done):
bash
Copy
Edit
npm install
Start the server:
bash
Copy
Edit
npm start
By default, the server starts on port 3000.
Test endpoints:
Open pizza_api_tests.rest in VS Code.
Click on “Send Request” (the small “Send Request” text above each request).
Inspect the response in the REST client window.

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

HTTP Status Codes

201: A resource (order) was successfully created.

200: Successful GET/PUT/POST operation.

204: The resource was successfully deleted (no content returned).

400: Bad request (validation errors, malformed data).

404: Resource not found (invalid order ID, etc.).
