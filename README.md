# Social Network Backend

## Description

This is a social network API built with Express.js, MongoDB, and Mongoose. Users can create an account, share thoughts, react to friends' thoughts, and manage a friend list. The API is designed to handle large amounts of unstructured data, making it scalable for social media platforms.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Models](#models)
- [Technologies](#technologies)
- [Video](#video)
- [License](#license)

## Installation

To get started with this project, clone the repository and install the necessary dependencies:

```
git clone <repository-url>
cd <project-directory>
npm install
```

### Setting up MongoDB

Ensure MongoDB is installed and running on your machine. If using MongoDB Atlas, set up your connection string in a `.env` file.

### Example `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/socialNetworkDB
```

If you're using MongoDB Atlas, update the connection string accordingly.

## Usage

After installing the dependencies, start the server by running the following command:

```
npm run start
```

To run the server in development mode using `nodemon`, use:

```
npm run dev
```

## API Routes

### User Routes

- **GET** `/api/users` - Get all users
- **GET** `/api/users/:userId` - Get a single user by its ID
- **POST** `/api/users` - Create a new user
- **PUT** `/api/users/:userId` - Update a user by its ID
- **DELETE** `/api/users/:userId` - Delete a user by its ID (removes associated thoughts)

### Friend Routes

- **POST** `/api/users/:userId/friends/:friendId` - Add a friend to a user's friend list
- **DELETE** `/api/users/:userId/friends/:friendId` - Remove a friend from a user's friend list

### Thought Routes

- **GET** `/api/thoughts` - Get all thoughts
- **GET** `/api/thoughts/:thoughtId` - Get a single thought by its ID
- **POST** `/api/thoughts` - Create a new thought (requires `thoughtText`, `username`, and `userId`)
- **PUT** `/api/thoughts/:thoughtId` - Update a thought by its ID
- **DELETE** `/api/thoughts/:thoughtId` - Delete a thought by its ID

### Reaction Routes

- **POST** `/api/thoughts/:thoughtId/reactions` - Add a reaction to a thought (requires `reactionBody` and `username`)
- **DELETE** `/api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction from a thought

### Example for Creating a Thought:

To create a new thought under a user, you need to provide the `thoughtText`, `username`, and `userId`.

- **URL**: `POST /api/thoughts`
- **Request Body**:
```
{
  "thoughtText": "This is my first thought!",
  "username": "user123",
  "userId": "64f9bcf8478c9e001f4a8b1d"
}
```

Upon success, the thought will be created and associated with the specified user, and you'll receive the following message:
```
"Created the thought 🎉"
```

### Example for Adding a Reaction:

To add a reaction to a thought, use the following request:

- **URL**: `POST /api/thoughts/:thoughtId/reactions`
- **Request Body**:
```
{
  "reactionBody": "I totally agree!",
  "username": "user456"
}
```

## Models

### User Model

- `username` - String, unique, required, trimmed
- `email` - String, unique, required, must match a valid email format
- `thoughts` - Array of `_id` values referencing the Thought model
- `friends` - Array of `_id` values referencing the User model (self-reference)

**Virtuals**:

- `friendCount` - Retrieves the length of the `friends` array on query

### Thought Model

- `thoughtText` - String, required, must be between 1 and 280 characters
- `createdAt` - Date, default is the current timestamp, uses a getter to format the date
- `username` - String, required, the user who created the thought
- `reactions` - Array of nested documents created with the reactionSchema

**Virtuals**:

- `reactionCount` - Retrieves the length of the `reactions` array on query

### Reaction Schema (Embedded in Thought)

- `reactionId` - ObjectId, default is a new ObjectId
- `reactionBody` - String, required, maximum of 280 characters
- `username` - String, required
- `createdAt` - Date, default is the current timestamp, uses a getter to format the date

## Technologies

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database for scalability and flexibility
- **Mongoose** - ODM (Object Data Modeling) library for MongoDB
- **Nodemon** - Development utility to restart the server on file changes

## Video
https://youtu.be/mx_Yn0wyzdo

## License

This project is licensed under the MIT License.

```

MIT License
```
