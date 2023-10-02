# snort_log_view
## install  
~/snort_log_view/client$ npm install  
~/snort_log_view/server$ npm install  
### start
~/snort_log_view/server$ npm start  
~/snort_log_view/client$ npm start  

## snort.lua:
  
alert_json =  
{        
&ensp;&ensp;&ensp;&ensp;file = true,    
&ensp;&ensp;&ensp;&ensp;limit = 100,  
&ensp;&ensp;&ensp;&ensp;fields = 'timestamp iface src_addr src_port dst_addr dst_port proto action msg priority class sid dir dst_ap eth_dst eth_len eth_src eth_type gid icmp_code iface ip_id ip_len mpls pkt_gen pkt_len pkt_num rev rule seconds service src_ap target tcp_ack tcp_flags tcp_len tcp_seq tcp_win tos ttl udp_len vlan'  
}  
-- only timestamp, priority, rule, proto, src_ap, dst_ap, msg, class and seconds are mandatory  
  
appid_listener =  
{  
&ensp;&ensp;&ensp;&ensp;json_logging = true,  
&ensp;&ensp;&ensp;&ensp;file = "/var/log/snort/appid.json",  
}  
## files  
Alerts tab reads /server/alerts.json file, appid tab /server/appid.json file and search tab reads /server/alerts_all.json file. Files /server/alerts.json and /server/appid.json are requested frequently. To get fresh data, run:
  
    watch -n 5 "tail -n 30 /var/log/snort/alert_json.txt > /home/user/snort_log_view/server/alerts.json && chmod a+r /home/user/snort_log_view/server/alerts.json"  
    watch -n 1 "tail -n 40 /var/log/snort/appid.json > /home/user/snort_log_view/server/appid.json && chmod a+r /home/user/snort_log_view/server/appid.json"

  a large file /server/alerts_all.json slows down the operation of the search tab. If /var/log/snort/alert_json.txt is thousands of lines long, it is recommended to take part of it:

    tail -n 500 /var/log/snort/alert_json.txt > /home/user/snort_log_view/server/alerts_all.json && chmod a+r /home/user/snort_log_view/server/alerts_all.json

fix the paths
