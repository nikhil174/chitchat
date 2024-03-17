const express = require('express');
const { chats } = require('./data/data');
const { connectDB } = require('./config/db');
const app = express();
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
// const path = require('path');
const cors = require('cors');

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);


// const __dirname1 = path.resolve();
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname1, '/frontend/build')));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname1,"..", "frontend", "build", "index.html"));
//     })
// } else {
//     app.get('/', (req, res) => {
//         res.send("API is Running");
//     });
// }

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5001;
const server = app.listen(port, () => {
    console.log('Server listening on port 5000');
})

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:3000"
    }
})

io.on("connection", (socket) => {
    console.log('Connected to socket.io');
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log(userData);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log(`User joined room : ${room}`);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageReceived) => {
        const chat = newMessageReceived.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach(user => {
            if (user._id == newMessageReceived.sender._id) return;

            socket.in(user._id).emit("message received", newMessageReceived);
        })
    })

    socket.off("setup", () => {
        console.log("User Disconnected");
        socket.leave(userData._id);
    })
})