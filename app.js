const express = require('express');
const { dirname } = require('path');
const path = require('path');
const app = express();

app.use(express.static(__dirname+"public"));
app.engine('html',require('ejs').__express);
app.set('views', __dirname+'/views');
app.set('view engine','ejs');


var router = express.Router();
app.use(router);
app.use(express.json());
app.use(express.urlencoded({extended : true}));

var nickName= '';
app.get('/', function(req, res){
    res.render('intro.ejs');
})

app.post('/game', function(req, res){
    console.log(req.body);
    var nickName = req.body;
    res.render('game.ejs',req.body);

});
app.listen(8080, function(){
    console.log("listening on 8080");
});