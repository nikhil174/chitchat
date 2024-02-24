const express = require('express');
const { chats } = require('./data/data');
const { connectDB } = require('./config/db');
const app = express();
require('dotenv').config();

connectDB();

app.get('/', (req, res) => {
    res.send("API is Running");
});

app.get('/api/chats', (req, res) => {
    res.send(chats);
})

app.get('/api/chat/:id', (req, res) => {
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
})

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log('Server listening on port 5000');
})