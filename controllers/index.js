const express = require('express');
const user_db = require('../models/user_db');
const post_db = require('../models/post_db');
const multer = require('multer');

var router = express.Router();

const storage = multer.diskStorage({
    destination: './public/Images/Post',
    filename: function(req, file, callback){
        var current_time = Date.now();
        callback(null, `$current_time.jpg`);
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize:1000000}}).single('post_pic');

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

router.post('/post', (req, res)=>{
    console.log(req.body);
    console.log(req.body.post_text);
    obj = {
        text: req.body.post_text,
        start_time: req.body.start_date + ' ' + req.body.start_time,
        end_time: req.body.end_date + ' ' + req.body.end_time,
        amount: req.body.amount,
        Person_id: req.session.active_id
    }
    let validation_okay = true;
    if(req.body.post_text == ''){
        res.end();
        validation_okay = false;
    }
    
    if(req.body.start_date == ''){
        res.end();
        validation_okay = false;
    }
    if(req.body.start_time == ''){
        res.end();
        validation_okay = false;
    }
    if(req.body.end_date == ''){
        res.end();
        validation_okay = false;
    }
    if(req.body.end_time == ''){
        res.end();
        validation_okay = false;
    }
    if(req.body.amount == ''){
        res.end();
        validation_okay = false;
    }
    if(validation_okay){
        console.log(obj);
        console.log('object printed');
        post_db.make_post(obj);
    }
})

module.exports = router;