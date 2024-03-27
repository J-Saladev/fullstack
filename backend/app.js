
var express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = 3000

global.conn = require('./connection/connect');

conn.connect((err) => {
  if (err) throw err
  console.log('Connected to MySQL')
})

var indexRouter = require('./routes/index');


var app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/', indexRouter);



app.listen(port, () => {
  console.log(`Backend Server listening on port ${port}`)
})

module.exports = app;
