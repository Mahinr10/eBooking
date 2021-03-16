const bodyParser = require('body-parser');

express = require('express');

const app = express();
const PORT = 4000;


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('view engine', 'ejs');
app.use('/', require('./controllers/login.js'));

/// using routers



app.listen(PORT);