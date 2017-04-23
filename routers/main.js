/**
 * Created by lwy on 2017-04-21.
 */

let express = require('express');
let router = express.Router();
let searchJson = require('../db/dbHelper').searchJson;
let search = require('../db/dbHelper').search;

router.get('/', function (req, res, next) {
    // res.send('hello, baiduyunsearch');
    // console.log(req.query);
    let searchValue = req.query.search;
    if(searchValue){
        searchJson(searchValue)
            .then((result) => {
                // console.log(result[0][1]);
                // console.log(result[1][0].total);
                res.render('main', {results: result});
            });
    }else {
        res.render('main');
    }

});

router.post('/', function (req, res, next) {
    let searchvalue = req.fields.searchValue;
    // console.log(searchvalue);
    res.redirect(`/?search=${searchvalue}`);
});


module.exports = router;