var express = require('express');
const fs = require('fs')
//const readLastLines = require('read-last-lines');
var router = express.Router();
var Tail = require('tail').Tail;

router.get('/',async function(req, res, next) {
    let array = new Array()
    let count = 1
    const tail = new Tail('/var/log/snort/alert_json.txt',{nLines:1000})
    tail.on('line', data => {
        console.log(count++)
        array.push(JSON.parse(data))
    })
    setTimeout(() => {
        res.send(array)
        res.end()
        tail.unwatch()
    },2000)
   /*
    readLastLines.read('/var/log/snort/alert_json.txt', 1000)
	.then(async (lines) => {
        array = await lines.split('\n')
        array.pop()
        res.send(array.map(item => JSON.parse(item)))
        res.end()
    });*/
});

module.exports = router;