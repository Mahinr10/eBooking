const express = require('express');
const router = express.Router();
const user_db = require('../models/user_db');

router.get('/register', (req, res)=>{
    res.render('register');
})

router.post('/register', (req, res)=>{
    const {login} = req.body;
    console.log(req.body);
    if(login){
        res.redirect('/login');
    }
    else{
        user_db.register_eligibility(req.body).then((message)=>{
            console.log(message);
            user_db.do_register(req.body);
            console.log(req.body);
        })


    }
})
module.exports = router;