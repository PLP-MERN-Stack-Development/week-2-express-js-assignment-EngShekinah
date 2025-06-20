[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19822219&assignment_repo_type=AssignmentRepo)
# Express.js RESTful API Assignment

This assignment focuses on building a RESTful API using Express.js, implementing proper routing, middleware, and error handling.

## Assignment Overview

You will:
1. Set up an Express.js server
2. Create RESTful API routes for a product resource
3. Implement custom middleware for logging, authentication, and validation
4. Add comprehensive error handling
5. Develop advanced features like filtering, pagination, and search

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install dependencies:
   ```
   npm install
   ```
4. Run the server:
   ```
   npm start
   ```

## Files Included

- `Week2-Assignment.md`: Detailed assignment instructions
- `server.js`: Starter Express.js server file
- `.env.example`: Example environment variables file

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Postman, Insomnia, or curl for API testing

## API Endpoints

The API will have the following endpoints:

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a specific product
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

## Middleware

This API uses the following custom middleware:

- **Request Logging**: Logs every request with timestamp, HTTP method, and URL to the console.
- **Authentication**: Requires an `x-api-key` header with the value `my-secret-key` for all API requests. Requests without a valid key receive a 401 Unauthorized error.
- **Validation**: For `POST` and `PUT` requests to `/api/products`, the request body must include all required product fields (`name`, `description`, `price`, `category`, `inStock`). If any are missing, a 400 Bad Request error is returned.

### Example: Required Headers

```
GET /api/products HTTP/1.1
Host: localhost:3000
x-api-key: my-secret-key
```

### Example: Validation Error Response

```
POST /api/products
Content-Type: application/json
x-api-key: my-secret-key

{
  "name": "Tablet"
}
```
Response:
```
{
  "error": "Missing required product fields"
}
```

## Pagination, Filtering, and Search

The `GET /api/products` endpoint supports:

- **Pagination**: Use `page` and `limit` query parameters to control results.
  - Example: `/api/products?page=2&limit=5`
- **Filtering by Category**: Use the `category` query parameter to filter products by category.
  - Example: `/api/products?category=electronics`
- **Search by Name**: Use the `search` query parameter to search for products by name (case-insensitive, partial match).
  - Example: `/api/products?search=phone`
- All features can be combined:
  - Example: `/api/products?category=electronics&search=phone&page=1&limit=2`

### Example Response
```
{
  "page": 1,
  "limit": 2,
  "total": 1,
  "products": [
    {
      "id": "2",
      "name": "Smartphone",
      "description": "Latest model with 128GB storage",
      "price": 800,
      "category": "electronics",
      "inStock": true
    }
  ]
}
```

## Error Handling

The API implements comprehensive error handling:

- **404 Not Found**: Returned when a requested product does not exist.
- **400 Bad Request**: Returned when required fields are missing in POST or PUT requests.
- **401 Unauthorized**: Returned when the `x-api-key` header is missing or invalid.
- **500 Internal Server Error**: Returned for unexpected server errors. All errors are logged to the console.

### Example: 404 Not Found
```
GET /api/products/999
x-api-key: my-secret-key

Response:
{
  "error": "Product not found"
}
```

### Example: 401 Unauthorized
```
GET /api/products
x-api-key: wrong-key

Response:
{
  "error": "Unauthorized: Invalid or missing API key"
}
```

### Example: 500 Internal Server Error
If an unexpected error occurs, the API responds with:
```
{
  "error": "Internal Server Error"
}
```

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all the required API endpoints
2. Implement the middleware and error handling
3. Document your API in the README.md
4. Include examples of requests and responses

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)