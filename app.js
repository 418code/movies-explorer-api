const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { handleErrors } = require('./middlewares/error');
const router = require('./routes/index');

const { PORT } = process.env;

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '1kb', parameterLimit: 10 }));
app.use(cookieParser());

app.use(router);
app.use(handleErrors);

app.listen(PORT);
