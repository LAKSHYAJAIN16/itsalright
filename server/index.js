const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//Our Data. For Performance Reasons, we keep it as a local variable instead of a database
let data = [];

//Connection Callback
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("init", (buffer) => {
    //Deserialize
    const deserialized = JSON.parse(buffer);

    //Just for testing :)
    data = [];

    //Push it to our Data array
    data.push(deserialized);

    console.log(`Room ${deserialized.proxy} has been created successfully`);
  });

  socket.on("join", (buffer) => {
    //Deserialize
    const deserialized = JSON.parse(buffer);

    //Get the ID we're looking for
    const id = deserialized.id;

    //Loop over and get the stream we're looking for
    let rData = {};
    let found = false;
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      if (d.proxy === id) {
        rData = d;
        found = true;
      }
    }

    if (found) {
      socket.emit("join-call", JSON.stringify(rData));
      console.log("authorized");
    }
  });
});

server.listen(1829, () => {
  console.log("listening on *:1829 yo");
});
