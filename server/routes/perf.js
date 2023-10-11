var express = require('express');
var router = express.Router();
const readLastLines = require('read-last-lines');

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

module.exports = router;