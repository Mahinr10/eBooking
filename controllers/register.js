const e = require('express');
const express = require('express');
const router = express.Router();

router.get('/register', (req, res)=>{
    res.render('register');
})

router.post('/register', (req, res)=>{
    const {login} = req.body;
    if(login){
        res.redirect('/login');
    }
    else{
        
    }
})
module.exports = router;