const bodyParser = require('body-parser');

const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 4000;


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret:"SoftLab",
    resave: false,
    saveUninitialized: false,
    cookie:{
       // secure:true,
        maxAge:3000000
    }
}))
app.set('view engine', 'ejs');

/// including all routers
app.use('/', require('./controllers/login.js'));
app.use('/', require('./controllers/index.js'));
app.use('/', require('./controllers/register.js'));
app.use('/', require('./controllers/logout.js'));
app.use('/', require('./controllers/profile.js'));
app.use('/', require('./controllers/dashboard.js'));

/// setting static

app.use('/static', express.static('public'));



app.listen(PORT);