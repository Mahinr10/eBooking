const express = require('express');
const user_db = require('../models/user_db');
var router = express.Router();

router.get('/profile', (req, res)=>{
    if(req.session.active_id){
        user_db.get_user_info(req.session.active_id).then((info)=>{
            res.render('profile', {data:info[0]});
        })
    }
});

router.post('/profile', (req, res)=>{
    var info = req.body;
    user_db.update_user_info(req.session.active_id, info).then((msg)=>{
        console.log(msg);
    })
    res.redirect('/index');
})

module.exports = router;