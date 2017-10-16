var express = require('express');
var router = express.Router();
var R = require("r-script");

/* GET home page. */
router.get('/', function(req, res, next) {
    var vodka = JSON.parse(
        require("fs").readFileSync("public/vodka.json", "utf8"));
    R("public/ex-sync.R")
        .data({df: vodka, nGroups: 3, fxn: "mean"})
        .call(function (err, d) {
            if (err) throw err;
            console.log(d);
            //res.send(d);
            res.render(
                'index', {
                  title: JSON.stringify(d[1].group),
                  var1: JSON.stringify(d[1].rating),
                    vec1: JSON.stringify(d)
                }

            );
        });

    //res.render('index', { title: 'Express' });
});

module.exports = router;
