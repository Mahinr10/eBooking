const express = require('express');
const user_db = require('../models/user_db');
const post_db = require('../models/post_db');
const interest_db = require('../models/interest_db');
const multer = require('multer');
const formidable = require('formidable');
const fs = require('fs');

var router = express.Router();

const storage = multer.diskStorage({
    destination: './public/Images/Post',
    filename: function(req, file, callback){
        var current_time = Date.now();
        callback(null, `${current_time}.jpg`);
    }
})

const upload = multer({
    storage: storage,
    limits: {fileSize:1000000}}).single('post_pic');

router.get('/index', (req, res)=>{
    if(req.session.active_id){
         post_db.get_all_post(req.session.active_id).then((post_list)=>{
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
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files)=>{
        
        console.log(fields);
        let obj = {
            text:fields.post_text,
            amount:fields.amount,
            Person_id:req.session.active_id,
            start_time:fields.start_date + ' ' + fields.start_time,
            end_time:fields.end_date + ' ' + fields.end_time
        }
        post_db.make_post(obj)
        .then((ret)=>{
            let oldPath = files.post_pic.path;
            let newPath = "public/images/Post/" + ret.Post_id +".jpg"; 
            let rawData = fs.readFileSync(oldPath);
            fs.writeFile(newPath, rawData, (err)=>{
                if(err){
                    console.log(err);
                }
                res.redirect('/index');
                
            })
        })
        .catch(msg => console.log(msg));
    })
    
})

router.post('/interest', (req, res)=>{
    console.log(req.body);
    const {post_id} = req.body;
    interest_db.make_interest(req.session.active_id, post_id)
    .then(msg =>{
        console.log(msg);
        res.redirect('/index');
    })
    .catch(msg=>console.log(msg))
})

router.post('/uninterest', (req, res)=>{
    console.log(req.body);
    const {post_id} = req.body;
    interest_db.loose_interest(req.session.active_id, post_id)
    .then(msg =>{
        console.log(msg);
        res.redirect('/index');
    })
    .catch(msg=>console.log(msg))
})

router.get('/history', (req, res)=>{
    if(req.session.active_id){
        interest_db.get_history(req.session.active_id)
        .then(data=>{
            user_db.get_user_info(req.session.active_id).then((ui)=>{
                console.log(data);
                console.log(ui);
                res.render('history', {data:data, user:ui[0]});
            })
        })
    }
    else{
        res.redirect('/login');
    }
    
})

module.exports = router;