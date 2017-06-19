/**
 * Created by linweiyun on 2017/6/19.
 */

let express = require('express');
let router = express.Router();
let search = require('../db/dbHelper').search;
let searchJson = require('../db/dbHelper').searchJson;
let parseAllShare = require('../common/func').parseAllShare;
let sphinxSearch = require('../sphinx/sphinx').sphinxSearch;

router.get('/', function (req, res, next) {
    let filterValue = req.query.type;
    // console.log(filterValue);
    sphinxSearch('', 0, filterValue, 1,50)
        .then((result) => {
             // console.log(result);
            if (result == 'zero') {
                let r = [];
                // r.totalRecoders = 0;
                r.push({'totalRecoders': 0});
                res.send(r);
            }
            else if (result == 'finish') {
                let r = [];
                r.push({'totalRecoders': 0});
                console.log(r);
                res.send(r);
            } else {
                result = parseAllShare(result, '');
                res.render('menu', {results: result});
            }
        });

});

module.exports = router;