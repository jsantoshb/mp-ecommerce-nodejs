var express = require('express');
var exphbs  = require('express-handlebars');
var port = process.env.PORT || 3000
var {getPreference} = require('./config/mercadopago');
const bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/detail', async function (req, res) {
    let id = await getPreference(req.query)
    .then(id=> id)
    .catch(err=> err)
    console.log(req.query)
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

    console.log("Notification:", req.body)
    res.status(200).send();
})

app.listen(port);