const express = require('express');
const user_db = require('../models/user_db');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './static/Images/profile_pic',
    filename: function(req, file, callback){
        callback(null, `${req.session.active_id}.jpg`);
    }

});

const upload = multer({storage: storage}).single('profile_pic');

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

router.post('/profile_pic', (req, res)=>{
    upload(req, res, (err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(req.file);;
        }
    })
})


module.exports = router;