const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const { getBit } = require('./bitfinex');
const Bit = require('./models/bit');

const app = express();

const mongoDB = 'mongodb://admin:admin12345@ds245805.mlab.com:45805/bitfinex_db';
mongoose.connect(mongoDB, {
    useMongoClient: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));  

// const rootPath = path.resolve('./app');

const viewsPath = path.join(__dirname + '/views');
const staticPath = path.join(__dirname + '/public');

app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(staticPath));

app.get('/', (req, res, next) => {
    res.render('index');
});

app.get('/price', (req, res) => {
    const resData = {};
    getBit()
        .then((response) => {
            dataApi = response.data ? response.data : {};

            let b = new Bit;
            b.mid = dataApi.mid;
            b.low = dataApi.low;
            b.high = dataApi.high;
            b.timestamp = dataApi.timestamp;
            b.save();
            
            res.json(dataApi);
        })
        .catch((err) => {
            console.error(err.message);
        });
});

module.exports = app;