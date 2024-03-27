var express = require('express');
var router = express.Router();
const conn = require('../connection/connect')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/views/:section', function(req, res, next) {

  const section = req.params.section
  conn.query(`SELECT * FROM ${section}`, (err, rows) => {

    if (err) throw err
    res.send(rows)
    console.log('Recieved request and sending data')
  })


});

module.exports = router;
