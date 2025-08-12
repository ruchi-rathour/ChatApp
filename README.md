
# Talk of Town — ChatApp
Real-time chat app (MERN) with JWT auth, Socket.IO messaging, 1:1 & group chats.

---

## Project overview

1. This project is a full‑stack chat application built with the MERN stack (MongoDB, Express, React, Node). It supports:

   * User registration & login (JWT authentication)
   * Real-time messaging with **Socket.IO** (typing indicators, join rooms)
   * One‑to‑one chats and group chats (create/rename/add/remove users)
   * Message history and searching users

2. The backend exposes a REST API under `/api/*` and also serves the React frontend when `NODE_ENV=production`.

---

##  Tech stack

* **Frontend:** React (Create React App)
* **Backend:** Node.js, Express
* **Database:** MongoDB (Mongoose)
* **Realtime:** Socket.IO
* **Auth:** JSON Web Tokens (JWT)
* **Other:** bcryptjs, dotenv, nodemon (dev), colors

---

##  Environment variables

Create a `.env` file at the project root with the following variables (example values shown):
```
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/chat-db?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
PORT=5001
NODE_ENV=development
```
## API Documentation

POST /api/user/login → Login user

POST /api/user → Register user

GET /api/user → Search users (requires auth)

GET /api/message/:chatId → Get all messages

POST /api/message → Send message

For full API details, refer to the included Postman collection file (postman_collection.json).

**[View Postman API Collection](https://ruchirathore.postman.co/workspace/Ruchi-Rathore's-Workspace~986a3705-1a3d-4658-8465-7471ee42af5a/collection/46715221-f78554f4-347a-430f-a136-2b17647c4df8?action=share&source=copy-link&creator=46715221)**
