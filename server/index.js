const express = require('express');
const { chats } = require('./data/data');
const { connectDB } = require('./config/db');
const app = express();
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("API is Running");
});

app.use('/api/user', userRoutes);

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log('Server listening on port 5000');
})