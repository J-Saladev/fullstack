var express = require('express');
var router = express.Router();
const conn = require('../connection/connect')

router.get('/views/:section', function(req, res, next) {
  console.log('Recieved request')

  const section = req.params.section
  conn.query(`SELECT * FROM ${section}`, (err, rows) => {

    if (err) throw err
    res.send(rows)
    console.log('Recieved request and sending data for ' + section)
  })


});

router.post('/add/:section', async function(req, res, next) {
  const section = req.params.section
  const data = req.body
  
  console.log(data)
 
   

  
  
  let sql =''
  let result = await checkExists(section, data)
  console.log(result)
   if (checkExists(section, data) == true) {
     console.log('Record already exists')
     sql = `UPDATE ${section} SET ? WHERE id = ${data.id}`

   
  } else {
    delete data.id
   sql = `INSERT INTO ${section} SET ?`
   

   }
   conn.query(sql, data, (err, rows) => {

     if (err) throw err
    
     console.log('Recieved request to update ' + section)
     res.send('success')
   })

 
 
});

router.delete('/delete/:section', function(req, res, next) {
  const section = req.params.section
  const data = req.body
  console.log(data)
  conn.query(`DELETE FROM ${section} WHERE id = ?`, data.id, (err, rows) => {
    if (err) throw err
    console.log('Recieved request to delete ' + section)
    res.send('success')
  })
})


async function checkExists(section, data){
  let sql = `SELECT EXISTS(SELECT id FROM ${section} WHERE id = ?) AS found`
  let id = data.id
  let result;
  conn.query(sql, id, (err, rows) => {
    if (err) throw err
    console.log('Rows Found vvvv')
    console.log(rows[0].found)
    result = rows[0].found == 1 ? true : false
    console.log(result)
    return result
    
  })
  
}


module.exports = router;
