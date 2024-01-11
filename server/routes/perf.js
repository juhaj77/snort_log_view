var express = require('express');
var router = express.Router();
//const readLastLines = require('read-last-lines');
var Tail = require('tail').Tail;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

router.get('/',async function(req, res, next) {
    let index = 1
    let response = ''
    let array = []
    do {
        array = []
        const tail = new Tail('/var/log/snort/perf_monitor_base.csv',{nLines:index})
        tail.on('line', data => {
            array.push(data)
        })
        await sleep(index*20) // time for reading
        response = array
        index++
    } while (array[0].split(',')[0] != '#timestamp')
    res.send(response)
});

/* // very slow solution if there is a lot of data
router.get('/',async function(req, res, next) {
    let array = []
    let index = 1
    let response = ''
    do {
        await readLastLines.read('/var/log/snort/perf_monitor_base.csv', index)
            .then(lines => {
                array = lines.split('\n')
                response = lines
            })
        index++
    } while (array[0].split(',')[0] != '#timestamp')

    res.send(response)
});
*/
module.exports = router;