const express = require('express');
var router = express.Router();

router.get('/index', (req, res)=>{
    if(req.session.active_id){
        res.send('I am viewing the index page');
    }
    else{
        res.redirect('/login');
    }
})

module.exports = router;