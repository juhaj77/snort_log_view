var express = require('express');
const fs = require('fs')
const readLastLines = require('read-last-lines');
var router = express.Router();

router.get('/',async function(req, res, next) {
    let array = new Array()
    
    readLastLines.read('/var/log/snort/alert_json.txt', 35)
	.then(async (lines) => {
        array = await lines.split('\n')
        array.pop()
        res.send(array.map(item => JSON.parse(item)))
        res.end()
    });
});

module.exports = router;