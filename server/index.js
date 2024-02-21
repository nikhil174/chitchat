const express = require('express');
const app = express();
require('dotenv').config();


const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log('Server listening on port 5000');
})