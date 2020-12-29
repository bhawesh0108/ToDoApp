var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencodedParser =  bodyParser.urlencoded({extended:false});

mongoose.connect('mongodb+srv://test:test@cluster0.vndeq.mongodb.net/test');
  
var todoSchema = new mongoose.Schema({
    item: String
});
 
var Todo = mongoose.model('Todo',todoSchema);

module.exports = function(app){

    app.get('/todo',function(req,res){
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todo:data});
        });

        
    });


    app.post('/todo',urlencodedParser,function(req,res){
          var newtodo = Todo(req.body).save(function(err,data){
              if(err) throw err;
              res.json(data);
          });

    });

    app.delete('/todo/:item',function(req,res){
         Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
             if(err) throw err;
             res.json(data);
         });
         
    });
};