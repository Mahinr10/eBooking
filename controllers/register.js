const express = require('express');
const router = express.Router();
const user_db = require('../models/user_db');

router.get('/register', (req, res)=>{
    if(req.session.active_id){
        res.redirect('/index')
    }
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
            user_db.do_register(req.body).then((user)=>{
                req.session.active_id = user[0].Person_id;
                res.redirect('/index');
            })
        }).catch((msg)=>{
            console.log(msg);
        })


    }
})
module.exports = router;