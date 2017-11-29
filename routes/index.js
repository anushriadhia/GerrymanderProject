var express = require('express');
var router = express.Router();
var R = require("r-script");

// Read Synchrously
var fs = require("fs");
console.log("\n *START* \n");
var content = fs.readFileSync("public/ncr.geojson");
console.log("Output Content : \n"+ content);
console.log("\n *EXIT* \n");

/* GET home page. */
router.get('/', function(req, res, next){
    res.render('home', {title: 'Spatial Gerrymandering Detection'});
});


/*Get map page. */
router.get('/map', function(req, res, next) {
    var ncrGeoText = JSON.parse(fs.readFileSync("public/ncr.geojson"));
    console.log(ncrGeoText);
    res.render('index', {var1: 10, vec1: 20, geoDump: JSON.stringify(ncrGeoText).toString() });
});

module.exports = router;
