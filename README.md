# snort_log_view
Colorized html table view for Snort alert, appid and performance monitor log. The Perf tab cleans out fields with zero values. The alert information generates the Wireshark filter from time data. The appid feature displays real-time data. The appid_listener is https://github.com/snort3/snort3_extra feature. Server reads the files:  
  
/var/log/snort/alert_json.txt  
/var/log/snort/appid.json  
/var/log/snort/perf_monitor_base.csv  
  
Search feature search of the last 1000 alerts. You can modify it in /server/routes/alertsAll.js on line 9:  
  
`const tail = new Tail('/var/log/snort/alert_json.txt',{nLines:1000})`  
  
Large values cause memory issues with the browser. All data is read as objects into the browser's memory...

## install  
/snort_log_view/client$ npm install  
/snort_log_view/server$ npm install  
### start
/snort_log_view/server$ sudo npm start  
/snort_log_view/client$ npm start  

## snort.lua:
  
perf_monitor = {}  
  
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

## screenshots  
The alert view shows the latest alerts   
![alert view](https://github.com/juhaj77/snort_log_view/blob/main/screenshots/1.png)   
Appid view is updated with a socket connection.  
![appid view](https://github.com/juhaj77/snort_log_view/blob/main/screenshots/2.png)  
The search tab has various search and arrangement features
![search view](https://github.com/juhaj77/snort_log_view/blob/main/screenshots/3.png)  
![search view](https://github.com/juhaj77/snort_log_view/blob/main/screenshots/4.png)  
Performance monitor data in table
![perf monitor view](https://github.com/juhaj77/snort_log_view/blob/main/screenshots/6.png) 
### todo
Find a faster solution than read-last-lines.
