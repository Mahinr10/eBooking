express = require('express');
var router = express.Router();
var user_db = require('../models/user_db');

router.get('/login', (req, res)=>{
  //  req.session.active_id = 5;
    console.log(`session_id: ${req.session.active_id}`);
    if(req.session.active_id){
        res.redirect('/index');
    }
    else{
        //req.session.active_id = 10;
        console.log(`session_id: ${req.session.active_id}`);
        res.render('login');
    }
})

router.post('/login', (req, res)=>{
    console.log(req.body);
    const {register} = req.body;
    function set_session(id_num){
        req.session.active_id = id_num;
        console.log(`session_id: ${req.session.active_id}`)
    }
    if(register){
        res.redirect('/register');
    }
    else{
        user_info = undefined;
        user_db.login_validation(req.body).then((user) => {
            console.log("User got validated");
            console.log(user)
            set_session(user[0].Person_id);
            console.log(`Person_id: ${user[0].Person_id}`)
            
            res.redirect('/index');
        });
        
    }
})




console.log('I am here');

module.exports = router;