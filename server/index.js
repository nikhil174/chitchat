const express = require('express');
const { chats } = require('./data/data');
const { connectDB } = require('./config/db');
const app = express();
const userRoutes = require('./routes/userRoutes');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');
require('dotenv').config();

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("API is Running");
});

app.use('/api/user', userRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log('Server listening on port 5000');
})