var express = require('express');
const fs = require('fs')
//const readLastLines = require('read-last-lines');
var router = express.Router();
var Tail = require('tail').Tail;

router.get('/:amount',async function(req, res, next) {
    let array = new Array()
    const tail = new Tail('/var/log/snort/alert_json.txt',{nLines:req.params.amount})
    tail.on('line', data => {
        array.push(JSON.parse(data))
    })
    setTimeout(() => {
        res.send(array)
        tail.unwatch()
    },req.params.amount/2) //Time in milliseconds to read lines. 

   /* This solution took 30 seconds:
    readLastLines.read('/var/log/snort/alert_json.txt', 1000)
	.then(async (lines) => {
        array = await lines.split('\n')
        array.pop()
        res.send(array.map(item => JSON.parse(item)))
        res.end()
    });*/
});

module.exports = router;