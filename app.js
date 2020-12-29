var express =  require('express');
var todolist  = require('./controllers/todocontroller');
var app = express();
  
// static files
app.use(express.static('./public'));

//setting up template engine
app.set('view engine','ejs');

// listen port
app.listen('3000');

//fire controller

todolist(app);