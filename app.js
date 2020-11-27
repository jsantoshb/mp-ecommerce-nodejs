var express = require('express');
var exphbs  = require('express-handlebars');
var port = process.env.PORT || 3000
var config = require('./config/mercadopago');
var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/detail', function (req, res) {
    res.render('detail', {...req.query, mpid: global.id});
});

app.get('/success', function (req, res) {
    res.render('success', req.query);
});
app.get('/pending', function (req, res) {
    res.render('pending', req.query);
});
app.get('/failure', function (req, res) {
    res.render('failure', req.query);
});

app.get('/', function (req, res) {
    res.render('home');
});

app.post('/checkout',function (req, res){

    console.log('****************');
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    console.log('****************');

    res.status(200).json({ok:true});
})

app.listen(port);