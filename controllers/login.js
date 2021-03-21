express = require('express');
var router = express.Router();
var user_db = require('../models/user_db')

router.get('/login', (req, res)=>{
    res.render('login');
})

router.post('/login', (req, res)=>{
    console.log(req.body);
    const {register} = req.body;
    if(register){
        res.redirect('/register');
    }
    else{
        user_info = undefined;
        user_db.login_validation(req.body).then((user) => {
            user_info = user;
        });
        req.session.active_id = user_info.ID;
        res.redirect('/index');
    }
})

console.log('I am here');

module.exports = router;