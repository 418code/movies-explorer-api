const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { handleErrors } = require('./middlewares/error');
const router = require('./routes/index');
const limiter = require('./middlewares/limit');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');

const { PORT, NODE_ENV, MONGO_URL } = process.env;

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

const app = express();

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '1kb', parameterLimit: 10 }));
app.use(cookieParser());

app.use(router);
app.use(errorLogger);
app.use(handleErrors);

app.listen(PORT);
