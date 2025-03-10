# Assignment #2: Web API Documentation – Pizza Order System

## Table of Contents

- [Assignment #2: Web API Documentation – Pizza Order System](#assignment-2-web-api-documentation--pizza-order-system)
  - [Table of Contents](#table-of-contents)
  - [Running the Project](#running-the-project)
    - [Install Dependencies](#install-dependencies)
    - [Test Endpoints](#test-endpoints)
  - [Endpoints Overview](#endpoints-overview)
  - [Endpoints Summary](#endpoints-summary)
  - [HTTP Status Codes](#http-status-codes)

---

## Running the Project

### Install Dependencies

```bash
npm install
```

In order to start the server, in the command below in the terminal after running the above command.

```bash
npm start
```

By default, the server listens on port 3000.

### Test Endpoints

```bash
1. Open the file pizza_api_tests.rest in VS Code.
2. Click on "Send Request" (the small text above each request).
3. Inspect the response in the REST client pane.
```

## Endpoints Overview

1. **Create (Place) a New Order**  
   - **Endpoint:** `POST /api/orders`  
   - **HTTP Method:** **POST**  
   - **Description:** Creates a new pizza order.

2. **Retrieve All Orders**  
   - **Endpoint:** `GET /api/orders`  
   - **HTTP Method:** **GET**  
   - **Description:** Retrieves a list of all pizza orders.

3. **Retrieve a Specific Order**  
   - **Endpoint:** `GET /api/orders/:orderId`  
   - **HTTP Method:** **GET**  
   - **Description:** Retrieves the details of a specific pizza order by its `orderId`.

4. **Update an Existing Order**  
   - **Endpoint:** `PUT /api/orders/:orderId`  
   - **HTTP Method:** **PUT**  
   - **Description:** Modifies an existing pizza order.

5. **Delete an Existing Order**  
   - **Endpoint:** `DELETE /api/orders/:orderId`  
   - **HTTP Method:** **DELETE**  
   - **Description:** Cancels (deletes) an existing pizza order.

6. **Complete an Existing Order**  
   - **Endpoint:** `POST /api/orders/:orderId/complete`  
   - **HTTP Method:** **POST**  
   - **Description:** Marks an order as completed, removes it from active orders, and returns an order summary (including total price).

---

## Endpoints Summary

| **Endpoint**                     | **Method** | **Description**                                                 | **Request Body Example**                                            | **Response**                                    |
|---------------------------------|-----------|-----------------------------------------------------------------|---------------------------------------------------------------------|-------------------------------------------------|
| `/api/orders`                   | **POST**   | Create a new order                                              | `{ "size": "large", "toppings": ["pepperoni"], "quantity": 2 }`     | Returns the created order object               |
| `/api/orders`                   | **GET**    | Retrieve all orders                                             | None                                                                | Returns array of orders                        |
| `/api/orders/:orderId`          | **GET**    | Retrieve a single order by ID                                   | None                                                                | Returns the order object                       |
| `/api/orders/:orderId`          | **PUT**    | Update an existing order                                        | Any subset of `{ "size": "...", "toppings": [...], "quantity": # }` | Returns the updated order object               |
| `/api/orders/:orderId`          | **DELETE** | Delete an existing order                                        | None                                                                | Returns **204 No Content**                     |
| `/api/orders/:orderId/complete` | **POST**   | Complete an order, remove it from active, and return a bill      | None                                                                | Returns a summary with `totalPrice`            |

---

## HTTP Status Codes

- **201**: A resource (order) was successfully created.  
- **200**: Successful `GET/PUT/POST` operation.  
- **204**: The resource was successfully deleted (no content returned).  
- **400**: Bad request (validation errors, malformed data).  
- **404**: Resource not found (invalid order ID, etc.).

---
