var express = require('express');
var router = express.Router();

router.get('/',async function(req, res, next) {
    res.sendFile('perf_monitor_base.csv', {root: '.'})
});

module.exports = router;