express = require('express');
var router = express.Router();

router.get('/login', (req, res)=>{
    res.render('login');
})

router.post('/login', (req, res)=>{
    console.log(req.body);
})

console.log('I am here');

module.exports = router;