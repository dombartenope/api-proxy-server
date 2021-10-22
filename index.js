const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());

//Rate limiter middleware to avoid spamming the weather api endpoint
const limit = rateLimit({
    windowMs: 10 * 60 * 1000, //10 minutes
    max: 10,
})
app.use(limit);
app.set('trust proxy', 1);

//Look in routes file and find GET request
app.use('/api', require('./routes'))

app.use(cors());

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
