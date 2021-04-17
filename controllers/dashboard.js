const express = require('express');
const user_db = require('../models/post_db');
const multer = require('multer');

const route = express.Router();

const storage = multer.diskStorage({
    destination: './public/Images/post_pic',
    filename: function(req, file, cb){
        cb(null, not_sure)
    }
})

route.get('/dashboard', (req, res)=>{
    var data = undefined;
    res.render('dashboard', {data:data});
})

route.post('/post', )

module.exports = route;