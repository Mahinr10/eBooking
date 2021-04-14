const express = require('express');
const user_db = require('../models/user_db');
const post_db = require('../models/post_db');
var router = express.Router();

router.get('/index', (req, res)=>{
    if(req.session.active_id){
        user_db.get_user_info(req.session.active_id).then((user_info)=>{
            post_db.get_all_post().then((post_list)=>{
                post_data = post_list;
                let index_data = user_info[0];
                index_data.posts = post_list;
               // res.send(index_data);
                res.render('index', {data:index_data});
            });
        })
        
        
    }
    else{
        res.redirect('/login');
    }
})

module.exports = router;