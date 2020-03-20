const express = require("express");
const moongose = require("mongoose");
const path = require("path");
const cors = require("cors");
const routes = require("./routes");

const app = express();

//Desacopla o protocolo http de app e passar a utilizr o server
const server = require("http").Server(app);

//habilita o server a utilizar o protocolo webSocket atraves da variavel io
const io = require("socket.io")(server);

moongose
  .connect(
    "mongodb+srv://omnistack:omnistack@cluster0-kcuo2.mongodb.net/week7?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Mongodb connected!");
  })
  .catch(err => {
    console.log(err.messsage);
  });

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.json());

app.use(cors());

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use("/", routes);

server.listen(3333, () => {
  console.log("Server Running!");
});
