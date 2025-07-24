const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const messageRoutes = require("./routes/messageRoutes");
const path = require('path');

const app = express();
dotenv.config();
connectDB();

app.use(express.json()); //to accept json data

//app.get("/", (req, res) => {
  //res.send("api is running");
//});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);


//--------------------------------deployment-------------------------------------------------------
const __dirname2 = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname2, "/frontend/build")));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname2, "frontend", "build", "index.html"))
  });
} else {
  app.get("/", (req, res) => {
    res.send("api is running");
  });
}

//--------------------------------deployment-------------------------------------------------------

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5001;

const server=app.listen(PORT, console.log(`Server Started on PORT ${PORT}`.yellow.bold));
const io = require("socket.io")(server, {
  pingTimeout: 60000, //wait 60 sec before it goes off
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  //console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user join room:" + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));


  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.user not define");

    chat.users.forEach((user) => {
      if (user._id !== newMessageRecieved.sender._id)
        socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
     socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});