# MasterCode Backend

This is the backend for the MasterCode application.

## Prerequisites

- Node.js
- MongoDB

## Getting Started

1.  Install the dependencies:

    ```bash
    npm install
    ```

2.  Create a `.env` file in the root of the `backend` directory and add the following environment variables:

    ```
    MONGO_URI="your_mongodb_connection_string"
    PORT=5000
    JWT_SECRET="your_jwt_secret"
    ```

3.  Start the server:

    ```bash
    npm start
    ```

The server will be running on `http://localhost:5000`.

## API Endpoints

### Authentication

-   `POST /api/auth/register`: Register a new user.
-   `POST /api/auth/login`: Log in a user and get a JWT token.

### Snippets

-   `GET /api/snippets`: Get all snippets.
-   `GET /api/snippets/:id`: Get a single snippet by ID.
-   `POST /api/snippets`: Create a new snippet (requires authentication).
-   `PUT /api/snippets/:id`: Update a snippet (requires authentication).
-   `DELETE /api/snippets/:id`: Delete a snippet (requires authentication).
