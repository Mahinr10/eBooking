express = require('express');
var router = express.Router();
var user_db = require('../models/user_db')

router.get('/login', (req, res)=>{
    res.render('login');
})

router.post('/login', (req, res)=>{
    console.log(req.body);
    user_db.login_validation(req.body).then((user) => console.log(user));
})

console.log('I am here');

module.exports = router;