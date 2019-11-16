var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var port = process.env.PORT || 58082;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("disconnect", function() {
    io.emit("user disconnected")
  });
  socket.on("chat message", function(msg) {
    console.log("message: " + msg);
    socket.broadcast.emit('chat message', msg);
  });
  socket.broadcast.emit('hi');
});

http.listen(port, function() {
  console.log(`Listening on *:${port}`);
});
