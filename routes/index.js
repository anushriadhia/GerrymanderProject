var express = require('express');
var router = express.Router();
var R = require("r-script");

// Read Synchrously
var fs = require("fs");
var content = fs.readFileSync("public/ncr.geojson");

/* GET home page. */
<<<<<<< HEAD
router.get('/', function(req, res, next){
    res.render('home', {title: 'Spatial Gerrymandering Detection'});
});


/*Get map page. */
router.get('/map', function(req, res, next) {
    var ncrGeoText = JSON.parse(fs.readFileSync("public/ncr.geojson"));
    console.log(ncrGeoText);
    res.render('index', {var1: 10, vec1: 20, geoDump: JSON.stringify(ncrGeoText).toString() });
=======
router.get('/', function(req, res, next) {
    var ncrGeoText = JSON.parse(fs.readFileSync("public/ncr.geojson"));
    console.log(ncrGeoText);
    res.render('index', { title: 'Geographic Gerrymandering Detection', var1: 10, vec1: 20, geoDump: JSON.stringify(ncrGeoText).toString() });
>>>>>>> ba027ae635986974b149383a1f7af46b3b2136c4
});

module.exports = router;
