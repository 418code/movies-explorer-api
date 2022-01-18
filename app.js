const express = require('express');
const mongoose = require('mongoose');
const { handleErrors } = require('./middlewares/error');
const {
  sendErrRes,
  errCodes,
  errMsgs,
} = require('./utils/utils');

const { PORT } = process.env;

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '1kb', parameterLimit: 10 }));

app.use('*', (req, res) => {
  sendErrRes(res, errCodes.ERR_CODE_NOT_FOUND, errMsgs.ERR_MSG_NOT_FOUND('page'));
});

app.use(handleErrors);

app.listen(PORT);
