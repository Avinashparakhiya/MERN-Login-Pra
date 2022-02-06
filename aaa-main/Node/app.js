const express = require('express');
const app = express();
const port = 3000;
const route = require('./routes/mainRoute');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser')

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.options('*', cors());
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Mongoose Connected successfully');
});

app.use('/', route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
