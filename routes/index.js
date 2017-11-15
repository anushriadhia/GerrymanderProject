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
router.get('/', function(req, res, next) {
    // var vodka = JSON.parse(
    //     require("fs").readFileSync("public/vodka.json", "utf8"));
    // R("public/ex-sync.R")
    //     .data({df: vodka, nGroups: 3, fxn: "mean"})
    //     .call(function (err, d) {
    //         if (err) throw err;
    //         console.log(d);
    //         //res.send(d);
    //         res.render(
    //             'index', {
    //               title: JSON.stringify(d[1].group),
    //               var1: JSON.stringify(d[1].rating),
    //                 vec1: JSON.stringify(d)
    //             }
    //
    //         );
    //     });
    //var content = fs.readFileSync("public/ncr.geojson")
    var ncrGeoText = JSON.parse(fs.readFileSync("public/ncr.geojson"));
    console.log(ncrGeoText);
    res.render('index', { title: 'Partisan Gerrymandering Detection', var1: 10, vec1: 20, geoDump: JSON.stringify(ncrGeoText).toString() });
});

module.exports = router;
