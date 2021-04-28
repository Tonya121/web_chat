const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Auth = require("./router/auth");
const { users } = require("./controllers/user")
const {
    indexDialog,
    createDialog,
    deleteDialog,
} = require("./controllers/dialog");

const {
  updateReadStatus,
  deleteMessage,
  createMessage,
  indexMessage,
} = require("./controllers/messages");

const app = express();
const server = http.createServer(app);

const PORT = 8000 || process.env.PORT;

const io = require("socket.io")(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin,
            "Access-Control-Allow-Credentials": true,
        };
        res.writeHead(200, headers);
        res.end();
    },
});

io.on("connection", (socket) => {
    socket.on("DIALOGS:JOIN", (dialogId) => {
        socket.dialogId = dialogId;
        socket.join(dialogId);
    });
    socket.on("DIALOGS:TYPING", (obj) => {
        socket.broadcast.emit("DIALOGS:TYPING", obj);
    });
});

global.io = io;

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(
        () => {
            console.log("Connected to MongoDB");
        },
        (err) => console.log("Error", err)
    );

app.use(express.json());
app.use(cors());

app.post("/signUp", Auth);

app.get('/users', users);

app.get("/dialogs", indexDialog);
app.delete("/dialogs/:id", deleteDialog);
app.post("/dialogs", createDialog);

app.get("/messages", indexMessage);
app.post("/messages", createMessage);
app.delete("/messages", deleteMessage);

server.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});
