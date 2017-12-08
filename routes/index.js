var express = require('express');
var router = express.Router();
var R = require("r-script");
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next){
    res.render('home', {title: 'Geographic Gerrymandering Detection'});
});



router.get('/map', function(req, res, next) {
    let ncrGeoText = JSON.parse(fs
        .readFileSync("public/ncr.geojson", 'utf8')
        .replace(/&#34;/g, '"'))['features']
        .reduce((total, current) => {
            total[current.properties.DISTRICT] = current.properties;
            return total;
        }, {});

    for (let district in ncrGeoText){
        console.log(district)
    }

    res.render('index', { title: 'Geographic Gerrymandering Detection', var1: 10, vec1: 20, geoDump: JSON.stringify(ncrGeoText).toString() });
});

module.exports = router;
