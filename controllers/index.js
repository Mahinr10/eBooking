const express = require('express');
const user_db = require('../models/user_db');
const post_db = require('../models/post_db');
var router = express.Router();

router.get('/index', (req, res)=>{
    if(req.session.active_id){
         post_db.get_all_post().then((post_list)=>{
               // res.send(post_list);
            user_db.get_user_info(req.session.active_id).then((ui)=>{
                console.log(post_list);
                console.log(ui);
                res.render('index', {data:post_list, user_data:ui[0]});
            })
               
            });
        
    }
    else{
        res.redirect('/login');
    }
})

module.exports = router;