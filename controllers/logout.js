const express = require('express');
var router = express.Router();

router.get('/logout', (req, res)=>{
    req.session.active_id = undefined;
    res.redirect('/index');
});

module.exports = router;