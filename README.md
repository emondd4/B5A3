# Library Management System API
A RESTful API for managing a library system, built with Express, TypeScript, and MongoDB (using Mongoose). This project supports book creation, retrieval, updating, deletion, and borrowing operations, with robust validation, error handling, and MongoDB aggregation for borrowed books summaries.


# Features
**Book Management**: Create, read, update, and delete books with proper schema validation.

**Borrowing System**: Borrow books with availability control using Mongoose static methods and middleware.

**Aggregation Pipeline**: Summarize borrowed books with total quantities and book details.

**Filtering and Sorting**: Filter books by genre and sort by fields like createdAt.

**Error Handling**: Structured error responses for validation errors, 404s, and other issues.

**TypeScript**: Type-safe code with clear interfaces and strict typing.

**Mongoose Middleware**: Pre-save validation for borrow operations and book availability updates.

# Prerquisites
**Node.js**: v16 or higher

**MongoDB**: Local instance or MongoDB Atlas

**TypeScript**: For compiling the project

**npm**: For dependency management

# Project Structure
```
library-management-system/
├── src/
│   ├── config/
│   │   └── db.ts
│   ├── models/
│   │   ├── book.ts
│   │   └── borrow.ts
│   ├── routes/
│   │   ├── books.ts
│   │   └── borrow.ts
│   ├── middleware/
│   │   └── errorHandler.ts
│   ├── app.ts
│   └── server.ts
├── package.json
├── tsconfig.json
└── README.md
```

# Setup Instruction

1. Clone The Repository
   ```
   git clone https://github.com/your-username/library-management-system.git
   cd library-management-system
   ```
2. Install Dependencies
   ```
   npm install
   ```
3. Run the Application
   ```
   ///For Development
   npm run dev

   ///For Production
   npm run build
   npm start

   ```

# Api Endpoints
1. Create Book (POST /api/books)

   **Request Body:**
   ```json
   {
   "title": "The Theory of Everything",
   "author": "Stephen Hawking",
   "genre": "SCIENCE",
   "isbn": "9780553380163",
   "description": "An overview of cosmology and black holes.",
   "copies": 5,
   "available": true
   }
   ```
   
   **Response:**
   ```json
   {
   "success": true,
   "message": "Book created successfully",
   "data": {
     "_id": "64f123abc4567890def12345",
     "title": "The Theory of Everything",
     "author": "Stephen Hawking",
     "genre": "SCIENCE",
     "isbn": "9780553380163",
     "description": "An overview of cosmology and black holes.",
     "copies": 5,
     "available": true,
     "createdAt": "2024-11-19T10:23:45.123Z",
     "updatedAt": "2024-11-19T10:23:45.123Z"}
   }
   ```
 
   **Error Response:**
    
   ```json
   {
   "message": "Validation failed",
   "success": false,
   "error": {
     "name": "ValidationError",
     "errors": {
       "copies": {
         "message": "Copies must be a positive number",
         "name": "ValidatorError",
       "properties": {
           "message": "Copies must be a positive number",
           "type": "min",
           "min": 0
       },
     "kind": "min",
     "path": "copies"
   }
   }}}
   ```

2. Get All Books (GET /api/books)
   Query Parameters:
     filter
     sortBy
     sort
     limit
   Example: /api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5

   **Response**
   ```json
   {
    "success": true,
    "message": "Books retrieved successfully",
    "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }]
   }

3. Get Book By Id (GET /api/books)

   **Response**
   ```json
   {
    "success": true,
    "message": "Books retrieved successfully",
    "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }]
   }
   ```

   **Error**
   ```json
    {
    "success": false,
    "message": "Book not found",
    "error": "Not found"
    }
  

4. Update Book By Id (PUT /api/books/:bookId)

   **Response**
   ```json
   {
    "success": true,
    "message": "Books retrieved successfully",
    "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }]
   }
   ```

   **Error**
    ```json
    {
    "success": false,
    "message": "Book not found",
    "error": "Not found"
    }
  

  5. Delete Book (DELETE /api/books/:bookId)

     **Response**
     ```json
     {
     "success": true,
     "message": "Book deleted successfully",
     "data": null
     }
     ```
  
     **Error**
     ```json
     {
     "success": false,
     "message": "Book not found",
     "error": "Not found"
     }

  6. Borrow a Book (POST /api/borrow)

     **Request**
     ```json
     {
     "book": "64ab3f9e2a4b5c6d7e8f9012",
     "quantity": 2,
     "dueDate": "2025-07-18T00:00:00.000Z"
     }
     ```

     **Response**
     ```json
     {
     "success": true,
     "message": "Book borrowed successfully",
     "data": {
       "_id": "64bc4a0f9e1c2d3f4b5a6789",
       "book": "64ab3f9e2a4b5c6d7e8f9012",
       "quantity": 2,
       "dueDate": "2025-07-18T00:00:00.000Z",
       "createdAt": "2025-06-18T07:12:15.123Z",
       "updatedAt": "2025-06-18T07:12:15.123Z"
        }
      }
     ```
  
     **Error**
     ```json
     {
     "message": "Validation failed",
     "success": false,
     "error": {
       "name": "ValidationError",
       "errors": {
         "book": {
           "message": "Cast to ObjectId failed for value \"invalid-id\" at path \"book\"",
           "name": "CastError",
           "properties": {
             "message": "Cast to ObjectId failed for value \"invalid-id\" at path \"book\"",
             "type": "invalid"
           },
           "kind": "invalid",
           "path": "book"
            }
          }
        }
      }   

  5. Borrowed Book Summary (GET /api/borrow)

     **Response**
     ```json
     {
     "success": true,
     "message": "Borrowed books summary retrieved successfully",
     "data": [
       {
         "book": {
           "title": "The Theory of Everything",
           "isbn": "9780553380163"
         },
         "totalQuantity": 5
       },
       {
         "book": {
           "title": "1984",
           "isbn": "9780451524935"
         },
         "totalQuantity": 3
          }   
        ]
      }
     ```
