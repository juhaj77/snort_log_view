# snort_log_view
Colorized html table view for Snort alert, appid and performance monitor log. The Perf tab cleans out fields with zero values. The alert information generates the Wireshark filter from time data. The appid_listener is https://github.com/snort3/snort3_extra feature. It also works without it. Just ignore the appid tab.Performance monitoring does not need to be enabled. Just keep the files appid.json and perf_monitor_base.cvs in the server directory. Tested with Firefox and Chrome.
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
Data handling is a bit clumsy, but the software architecture is simple. Alerts tab reads /server/alerts.json file, appid tab /server/appid.json file and search tab reads /server/alerts_all.json file. Files /server/alerts.json and /server/appid.json are requested frequently. To get fresh data, run (superuser rights are required. fix the paths):
  
    watch -n 5 "tail -n 35 /var/log/snort/alert_json.txt > /home/user/snort_log_view/server/alerts.json && chmod a+r /home/user/snort_log_view/server/alerts.json"  
    watch -n 1 "tail -n 40 /var/log/snort/appid.json > /home/user/snort_log_view/server/appid.json && chmod a+r /home/user/snort_log_view/server/appid.json"

  a large file /server/alerts_all.json slows down the operation of the search tab. If /var/log/snort/alert_json.txt is thousands of lines long, it is recommended to take part of it:

    tail -n 500 /var/log/snort/alert_json.txt > /home/user/snort_log_view/server/alerts_all.json && chmod a+r /home/user/snort_log_view/server/alerts_all.json
#### performance monitor data
perf_monitor_base.csv should be read from header line. You can check it with `awk -F, '{print $1}' /var/log/snort/perf_monitor_base.csv`. For example, if it gives:  
...  
#timestamp  
1696441646  
1696443611  
  
then use:  

    tail -n 3 -f /var/log/snort/perf_monitor_base.csv > /home/user/snort_log_view/server/perf_monitor_base.csv
  
grant read permissions `chmod a+r /home/user/snort_log_view/server/perf_monitor_base.csv`.  

