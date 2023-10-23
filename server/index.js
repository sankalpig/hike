const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();
const fs = require("fs");
const multer = require("multer");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const upload = multer({ dest: 'uploads/' })

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
  // socket.on("upload", ({ data }) => {
  //   const sendUserSocket = onlineUsers.get(data.to);
  //   console.log(data);
  //   fs.writeFile(
  //     "upload/" + "test.png",
  //     data,
  //     { encoding: "base64" },
  //     () => { }
  //   );

  //   socket.to(sendUserSocket).emit("uploaded", { buffer: data.toString("base64") });
  // });

  app.post("/upload", upload.single("chatImage"), (req, res) => {
    console.log(req.body);
    console.log(req.file);

    return res.redirect('/api/messages/getmsg')

  })
});