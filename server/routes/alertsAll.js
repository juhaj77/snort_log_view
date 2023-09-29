var express = require('express');
const fs = require('fs')
const open = require('fs').promises.open 
var router = express.Router();

router.get('/',async function(req, res, next) {
    let array = new Array()
    const file = await open('./alerts_all.json');
    
    let json = JSON.parse('{ "timestamp" : "", "iface" : "", "src_addr" : "", "dst_addr" : "", "proto" : "", "action" : "", "msg" : "", "priority" : 0, "class" : "", "sid" : -1, "dir" : "", "dst_ap" : "", "gid" : 0, "icmp_code" : -1, "iface" : "", "ip_id" : "", "ip_len" : 0, "mpls" : 0, "pkt_gen" : "", "pkt_len" : 0, "pkt_num" : 0, "rev" : 0, "rule" : "", "seconds" : 0, "service" : "", "src_ap" : "", "tos" : 0, "ttl" : 0, "vlan" : 0 }')
    for await (const line of file.readLines()) {
        try {
            json = await JSON.parse(line)
        } catch (e) {
            console.log(e)
        }
        array.push(json)
    }

    res.send(array)
});

module.exports = router;