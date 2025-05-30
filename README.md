# snort_log_view
**Colorized HTML table view for Snort alerts, AppID, and performance monitor logs.**  
The **Perf** tab automatically hides fields with zero values.  
Alert information is used to generate a **Wireshark filter** based on timestamp data.  
The **AppID** feature displays real-time data. It uses the `appid_listener` feature from [snort3_extra](https://github.com/snort3/snort3_extra).  
The server reads the following log files: 
  
- `/var/log/snort/alert_json.txt`
- `/var/log/snort/appid.json`
- `/var/log/snort/perf_monitor_base.csv`

## install  
/snort_log_view/client$ npm install  
/snort_log_view/server$ npm install  
### start
/snort_log_view/server$ export NODE_OPTIONS=--max-old-space-size=8192    
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
