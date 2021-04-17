const express = require('express');
const user_db = require('../models/user_db');
const post_db = require('../models/post_db');
var router = express.Router();

router.get('/index', (req, res)=>{
    if(req.session.active_id){
         post_db.get_all_post().then((post_list)=>{
               // res.send(post_list);
               console.log(post_list);
                res.render('index', {data:post_list});
            });
        
    }
    else{
        res.redirect('/login');
    }
})

module.exports = router;