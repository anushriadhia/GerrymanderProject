var express = require('express');
var router = express.Router();
var R = require("r-script");

// Read Synchrously
var fs = require("fs");
var content = fs.readFileSync("public/ncr.geojson");

/* GET home page. */
router.get('/', function(req, res, next){
    res.render('home', {title: 'Geographic Gerrymandering Detection'});
});



router.get('/map', function(req, res, next) {
    var ncrGeoText = JSON.parse(fs.readFileSync("public/ncr.geojson"));
    console.log(ncrGeoText);
    res.render('index', { title: 'Geographic Gerrymandering Detection', var1: 10, vec1: 20, geoDump: JSON.stringify(ncrGeoText).toString() });
});

module.exports = router;
