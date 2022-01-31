const express = require('express');
const cookieParser = require('cookie-parser');
const { handleErrors } = require('./middlewares/error');
const router = require('./routes/index');
const limiter = require('./middlewares/limit');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');
const { mongoConnect } = require('./utils/utils');

const { PORT } = process.env;

mongoConnect();

const app = express();

app.use(requestLogger);
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '1kb', parameterLimit: 10 }));
app.use(cookieParser());

app.use(router);
app.use(errorLogger);
app.use(handleErrors);

app.listen(PORT);
