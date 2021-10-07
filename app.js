const express = require('express');
const path = require('path');
require("dotenv").config();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const PORT = process.env.PORT || 5000
const FRONT_END_URL = process.env.FRONT_END_URL || "http://localhost:8081"

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const {init} = require("./config/config");


// Database connection init...
init();

const app = express();

const corsOptions = {
  origin: FRONT_END_URL
};

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/admin', adminRouter);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
