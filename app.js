const express = require("express");
const socketio = require("socket.io");
const cors = require("cors"); // เพิ่ม require สำหรับ middleware CORS
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cors()); // เรียกใช้ middleware CORS

app.get("/", (req, res) => {
  res.render("index");
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running ...");
});

const io = socketio(server);

//initialize socket for the server
io.on("connection", (socket) => {
  console.log("New user connected");

  socket.username = "Anonymous";

  socket.on("change_username", (data) => {
    socket.username = data.username;
  });

  socket.on("new_message", (data) => {
    console.log("new message");
    io.sockets.emit("receive_message", {
      message: data.message,
      username: socket.username,
    });
  });
});
