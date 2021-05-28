const express = require('express');
const interest_db = require('../models/interest_db');
const user_db = require('../models/user_db');
const route = express.Router();


route.get('/dashboard', (req, res)=>{
    if(req.session.active_id){
        interest_db.get_all_interest(req.session.active_id)
        .then((data=>{
            user_db.get_user_info(req.session.active_id).then((ui)=>{
            // console.log(post_list);
            // console.log(ui);
                res.render('dashboard', {data:data, user:ui[0]});
            })
            
        }))
    }
    else{
        res.redirect('/login');
    }
    
})

route.post('/rent', (req, res)=>{
    console.log(req.body);
    interest_db.make_invoice(req.body)
    .then(msg=>console.log(msg))
    .catch(msg=>console.log(msg))
    res.redirect('/dashboard');
})

module.exports = route;