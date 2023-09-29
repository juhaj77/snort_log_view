# snort_log_view
in snort.lua:
alert_json =
{        file = true,
        limit = 100,
        fields = 'timestamp iface src_addr src_port dst_addr dst_port proto action msg priority class sid dir dst_ap eth_dst eth_len eth_src eth_type gid icmp_code iface ip_id ip_len mpls pkt_gen pkt_len pkt_num rev rule seconds service src_ap target tcp_ack tcp_flags tcp_len tcp_seq tcp_win tos ttl udp_len vlan'
}
appid_listener =
{
        json_logging = true,
        file = "/var/log/snort/appid.json",
}
files /server/alerts.json and /server/appid.json are requested frequently. To get fresh data, run:
watch -n 5 "tail -n 30 /var/log/snort/alert_json.txt > /home/user/snort_log_view/server/alerts.json && chmod a+r /home/user/snort_log_view/server/alerts.json"
watch -n 1 "tail -n 40 /var/log/snort/appid.json > /home/user/snort_log_view/server/appid.json && chmod a+r /home/user/snort_log_view/server/appid.json"
