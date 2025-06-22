import { HaproxyStatus } from '../haproxyClient';

export interface BackendProps {
  serviceName: string;
  status?: HaproxyStatus;
  dns: string;
  region?: string;
  regionState?: string;
  check_desc?: string;
  last_chk?: string;
}

export const downBackendTimeout: BackendProps = {
  serviceName: 'canary-sol-saturn-1-backend-41',
  status: 'DOWN',
  dns:
    'backend.test-service-regional.sol-saturn-1.vibe.ca-montreal-1.oci.oracleiaas.com',
  check_desc: 'Layer4 timeout',
  region: 'sol-saturn-1',
  regionState: 'Building',
};

export const downBackendPartiallyUpService: BackendProps = {
  serviceName: 'canary-sol-saturn-1-backend-4000',
  status: 'DOWN',
  dns:
    'backend.test-service-regional-4000.sol-saturn-1.vibe.ca-montreal-1.oci.oracleiaas.com',
  check_desc: 'Layer4 timeout',
  region: 'sol-saturn-1',
  regionState: 'Building',
};

export const upBackendPartiallyUpService: BackendProps = {
  serviceName: 'canary-sol-saturn-1-backend-4000',
  status: 'UP',
  dns:
    'backend.test-service-regional-4000.sol-saturn-1.vibe.us-ashburn-1.oci.oracleiaas.com',
  check_desc: 'Layer6 check passed',
  region: 'us-ashburn-1',
  regionState: 'Production',
};

export const downBackendHandshake: BackendProps = {
  serviceName: 'ibex_control-eu-madrid-1-backend-257',
  status: 'DOWN',
  dns: 'controlplane.logging.ad1.eu-madrid-1.oci.oracleiaas.com',
  check_desc: 'Layer6 invalid response',
  last_chk: 'SSL handshake failure',
  region: 'eu-madrid-1',
  regionState: 'Production',
};

export const maintBackend: BackendProps = {
  serviceName: 'ibex_control-us-gov-manassas-1-backend-283',
  status: 'MAINT (resolution)',
  dns: 'controlplane.logging.ad1.us-gov-manassas-1.oci.oracledodrealm.ic.gov',
};

export const upBackendAshburn: BackendProps = {
  serviceName: 'account-backend-1',
  dns: 'bling.us-az-ashburn-1.oracleiaas.com',
  status: 'UP',
  region: 'us-ashburn-1',
  regionState: 'Production',
};

export const upBackendPhoenix: BackendProps = {
  serviceName: 'account-backend-1',
  dns: 'bling.us-az-phoenix-1.oracleiaas.com',
  status: 'UP',
  region: 'us-phoenix-1',
  regionState: 'Production',
};

export const unknownStateBackend: BackendProps = {
  serviceName: 'account-backend-1',
  dns: 'bling.us-az-unknown-1.oracleiaas.com',
  status: ('FOOBAR' as unknown) as HaproxyStatus,
  region: 'us-ashburn-1',
  regionState: 'Production',
};

export const downBackendUnresolvableDns: BackendProps = {
  serviceName: 'foobar-service-4-u',
  dns: 'foobar.eu-paris-1.oracleiaas.com',
  region: 'eu-paris-1',
  regionState: 'Building',
};

/*
 * This data is coupled to @mockLocalServices is mockRadData.ts
 */
export const mockHealthCheckData = `pxname,svname,qcur,qmax,scur,smax,slim,stot,bin,bout,dreq,dresp,ereq,econ,eresp,wretr,wredis,status,weight,act,bck,chkfail,chkdown,lastchg,downtime,qlimit,pid,iid,sid,throttle,lbtot,tracked,type,rate,rate_lim,rate_max,check_status,check_code,check_duration,hrsp_1xx,hrsp_2xx,hrsp_3xx,hrsp_4xx,hrsp_5xx,hrsp_other,hanafail,req_rate,req_rate_max,req_tot,cli_abrt,srv_abrt,comp_in,comp_out,comp_byp,comp_rsp,lastsess,last_chk,last_agt,qtime,ctime,rtime,ttime,agent_status,agent_code,agent_duration,check_desc,agent_desc,check_rise,check_fall,check_health,agent_rise,agent_fall,agent_health,addr,cookie,mode,algo,conn_rate,conn_rate_max,conn_tot,intercepted,dcon,dses,wrew,connect,reuse,cache_lookups,cache_hits,srv_icur,src_ilim,qtime_max,ctime_max,rtime_max,ttime_max,eint,idle_conn_cur,safe_conn_cur,used_conn_cur,need_conn_est,uweight,-,h2_headers_rcvd,h2_data_rcvd,h2_settings_rcvd,h2_rst_stream_rcvd,h2_goaway_rcvd,h2_detected_conn_protocol_errors,h2_detected_strm_protocol_errors,h2_rst_stream_resp,h2_goaway_resp,h2_open_connections,h2_backend_open_streams,h2_total_connections,h2_backend_total_streams,
stats,FRONTEND,,,1,3,3000,425,37736,1205179226,0,0,0,,,,,OPEN,,,,,,,,,1,2,0,,,,0,1,0,4,,,,0,424,0,0,0,0,,1,4,425,,,0,0,0,0,,,,,,,,,,,,,,,,,,,,,http,,1,4,425,425,0,0,0,,,0,0,,,,,,,0,,,,,,-,0,0,0,0,0,0,0,0,0,0,0,0,0,
stats,BACKEND,0,0,0,0,300,0,37736,1205179226,0,0,,0,0,0,0,UP,0,0,0,,0,1594,,,1,2,0,,0,,1,0,,0,,,,0,0,0,0,0,0,,,,0,0,83,0,0,0,0,0,,,0,0,0,10,,,,,,,,,,,,,,http,,,,,,,,0,0,0,0,0,,,0,0,0,37,0,,,,,0,-,0,0,0,0,0,0,0,0,0,0,0,0,0,
main,FRONTEND,,,0,161,3000,7488,5733713,5885900,0,0,1,,,,,OPEN,,,,,,,,,1,3,0,,,,0,0,0,225,,,,0,5022,1,2315,150,0,,0,225,7488,,,0,0,0,0,,,,,,,,,,,,,,,,,,,,,http,,0,225,7488,0,0,0,0,,,0,0,,,,,,,0,,,,,,-,0,0,0,0,0,0,0,0,0,0,0,0,0,
slow_down_cli,BACKEND,0,0,0,0,300,0,0,0,0,0,,0,0,0,0,UP,0,0,0,,0,1594,,,1,4,0,,0,,1,0,,0,,,,0,0,0,0,0,0,,,,0,0,0,0,0,0,0,-1,,,0,0,0,0,,,,,,,,,,,,,,http,,,,,,,,0,0,0,0,0,,,0,0,0,0,0,,,,,0,-,0,0,0,0,0,0,0,0,0,0,0,0,0,
devnull,BACKEND,0,0,0,0,300,0,0,0,0,0,,0,0,0,0,UP,0,0,0,,0,1594,,,1,5,0,,0,,1,0,,0,,,,0,0,0,0,0,0,,,,0,0,0,0,0,0,0,-1,,,0,0,0,0,,,,,,,,,,,,,,http,,,,,,,,0,0,0,0,0,,,0,0,0,0,0,,,,,0,-,0,0,0,0,0,0,0,0,0,0,0,0,0,
account-backend-1,bling.us-az-phoenix-1.oracleiaas.com,0,0,0,1,,1,137,255,,0,,0,0,0,0,UP,256,1,0,0,0,5623973,0,,1,6,1,,1,,2,0,,1,L6OK,,199,0,0,0,1,0,0,,,,1,0,0,,,,,1585,,,0,226,56,300,,,,Layer6 check passed,,2,3,4,,,,,,http,,,,,,,,0,1,0,,,0,,0,226,56,300,0,0,0,0,1,256,-,,,,,,,,,,,,,,
account-backend-1,bling.us-az-ashburn-1.oracleiaas.com,0,0,0,1,,1,137,255,,0,,0,0,0,0,UP,256,1,0,0,0,5623973,0,,1,6,1,,1,,2,0,,1,L6OK,,199,0,0,0,1,0,0,,,,1,0,0,,,,,1585,,,0,226,56,300,,,,Layer6 check passed,,2,3,4,,,,,,http,,,,,,,,0,1,0,,,0,,0,226,56,300,0,0,0,0,1,256,-,,,,,,,,,,,,,,
account-backend-1,bling.us-az-unknown-1.oracleiaas.com,0,0,0,1,,1,137,255,,0,,0,0,0,0,FOOBAR,256,1,0,0,0,5623973,0,,1,6,1,,1,,2,0,,1,L6OK,,199,0,0,0,1,0,0,,,,1,0,0,,,,,1585,,,0,226,56,300,,,,Layer6 check passed,,2,3,4,,,,,,http,,,,,,,,0,1,0,,,0,,0,226,56,300,0,0,0,0,1,256,-,,,,,,,,,,,,,,
account-backend-1,BACKEND,0,0,0,1,300,1,137,255,0,0,,0,0,0,0,UP,256,1,0,,0,1594,0,,1,6,0,,1,,1,0,,1,,,,0,0,0,1,0,0,,,,1,0,0,0,0,0,0,1585,,,0,226,56,300,,,,,,,,,,,,,,http,,,,,,,,0,1,0,0,0,,,0,226,56,300,0,,,,,256,-,0,0,0,0,0,0,0,0,0,0,0,0,0,
acs-backend-2,artifact-requirement-tabulator-service-beta.us-ashburn-1.oci.oraclecorp.com,0,0,0,1,,1,133,607,,0,,0,0,0,0,UP,256,1,0,0,0,1510250,0,,1,7,1,,1,,2,0,,1,L6OK,,23,0,0,0,0,1,0,,,,1,0,0,,,,,1585,,,0,23,5,29,,,,Layer6 check passed,,2,3,4,,,,,,http,,,,,,,,0,1,0,,,0,,0,23,5,29,0,0,0,0,1,256,-,,,,,,,,,,,,,,
acs-backend-2,BACKEND,0,0,0,1,300,1,133,607,0,0,,0,0,0,0,UP,256,1,0,,0,1594,0,,1,7,0,,1,,1,0,,1,,,,0,0,0,0,1,0,,,,1,0,0,0,0,0,0,1585,,,0,23,5,29,,,,,,,,,,,,,,http,,,,,,,,0,1,0,0,0,,,0,23,5,29,0,,,,,256,-,0,0,0,0,0,0,0,0,0,0,0,0,0,
artifact-push-service-backend-3,artifact-push-beta.us-ashburn-1.oci.oraclecorp.com,0,0,0,1,,1,151,279,,0,,0,0,0,0,UP,256,1,0,0,0,170356,0,,1,8,1,,1,,2,0,,1,L6OK,,26,0,0,0,1,0,0,,,,1,0,0,,,,,1585,,,0,22,2,27,,,,Layer6 check passed,,2,3,4,,,,,,http,,,,,,,,0,1,0,,,0,,0,22,2,27,0,0,0,0,1,256,-,,,,,,,,,,,,,,
artifact-push-service-backend-3,BACKEND,0,0,0,1,300,1,151,279,0,0,,0,0,0,0,UP,256,1,0,,0,1594,0,,1,8,0,,1,,1,0,,1,,,,0,0,0,1,0,0,,,,1,0,0,0,0,0,0,1585,,,0,22,2,27,,,,,,,,,,,,,,http,,,,,,,,0,1,0,0,0,,,0,22,2,27,0,,,,,256,-,0,0,0,0,0,0,0,0,0,0,0,0,0,
artifactory-backend-4,artifactory.oci.oraclecorp.com,0,0,0,1,,1,141,384,,0,,0,0,0,0,UP,256,1,0,0,0,1947439,0,,1,9,1,,1,,2,0,,1,L6OK,,187,0,0,1,0,0,0,,,,1,0,0,,,,,1585,,,0,188,66,261,,,,Layer6 check passed,,2,3,4,,,,,,http,,,,,,,,0,1,0,,,0,,0,188,66,261,0,0,0,0,1,256,-,,,,,,,,,,,,,,
artifactory-backend-4,BACKEND,0,0,0,1,300,1,141,384,0,0,,0,0,0,0,UP,256,1,0,,0,1594,0,,1,9,0,,1,,1,0,,1,,,,0,0,1,0,0,0,,,,1,0,0,0,0,0,0,1585,,,0,188,66,261,,,,,,,,,,,,,,http,,,,,,,,0,1,0,0,0,,,0,188,66,261,0,,,,,256,-,0,0,0,0,0,0,0,0,0,0,0,0,0,
bo-peep-backend-5,bo-peep-unstable.oci.oraclecorp.com,0,0,0,1,,1,137,255,,0,,0,0,0,0,UP,256,1,0,0,0,1947439,0,,1,10,1,,1,,2,0,,1,L6OK,,23,0,0,0,1,0,0,,,,1,0,0,,,,,1585,,,0,22,1,28,,,,Layer6 check passed,,2,3,4,,,,,,http,,,,,,,,0,1,0,,,0,,0,22,1,28,0,0,0,0,1,256,-,,,,,,,,,,,,,,
bo-peep-backend-5,BACKEND,0,0,0,1,300,1,137,255,0,0,,0,0,0,0,UP,256,1,0,,0,1594,0,,1,10,0,,1,,1,0,,1,,,,0,0,0,1,0,0,,,,1,0,0,0,0,0,0,1585,,,0,22,1,28,,,,,,,,,,,,,,http,,,,,,,,0,1,0,0,0,,,0,22,1,28,0,,,,,256,-,0,0,0,0,0,0,0,0,0,0,0,0,0,
bo-peep-unstable-backend-6,bo-peep-unstable.oci.oraclecorp.com,0,0,0,1,,1,146,255,,0,,0,0,0,0,UP,256,1,0,0,0,1947439,0,,1,11,1,,1,,2,0,,1,L6OK,,21,0,0,0,1,0,0,,,,1,0,0,,,,,1585,,,0,24,2,33,,,,Layer6 check passed,,2,3,4,,,,,,http,,,,,,,,0,1,0,,,0,,0,24,2,33,0,0,0,0,1,256,-,,,,,,,,,,,,,,
bo-peep-unstable-backend-6,BACKEND,0,0,0,1,300,1,146,255,0,0,,0,0,0,0,UP,256,1,0,,0,1594,0,,1,11,0,,1,,1,0,,1,,,,0,0,0,1,0,0,,,,1,0,0,0,0,0,0,1585,,,0,24,2,33,,,,,,,,,,,,,,http,,,,,,,,0,1,0,0,0,,,0,24,2,33,0,,,,,256,-,0,0,0,0,0,0,0,0,0,0,0,0,0,
build-backend-7,build-service-beta.us-ashburn-1.oci.oraclecorp.com,0,0,0,1,,1,135,255,,0,,0,0,0,0,UP,256,1,0,0,0,1947439,0,,1,12,1,,1,,2,0,,1,L6OK,,17,0,0,0,1,0,0,,,,1,0,0,,,,,1585,,,0,19,9,31,,,,Layer6 check passed,,2,3,4,,,,,,http,,,,,,,,0,1,0,,,0,,0,19,9,31,0,0,0,0,1,256,-,,,,,,,,,,,,,,
build-backend-7,BACKEND,0,0,0,1,300,1,135,255,0,0,,0,0,0,0,UP,256,1,0,,0,1594,0,,1,12,0,,1,,1,0,,1,,,,0,0,0,1,0,0,,,,1,0,0,0,0,0,0,1585,,,0,19,9,31,,,,,,,,,,,,,,http,,,,,,,,0,1,0,0,0,,,0,19,9,31,0,,,,,256,-,0,0,0,0,0,0,0,0,0,0,0,0,0,
canary-af-johannesburg-1-backend-8,backend.test-service-regional.af-johannesburg-1.oci.oracleiaas.com,0,0,0,1,,1,154,255,,0,,0,0,0,0,UP,256,1,0,0,0,1947439,0,,1,13,1,,1,,2,0,,1,L6OK,,735,0,0,0,1,0,0,,,,1,0,0,,,,,1585,,,0,734,238,972,,,,Layer6 check passed,,2,3,4,,,,,,http,,,,,,,,0,1,0,,,0,,0,734,238,972,0,0,0,0,1,256,-,,,,,,,,,,,,,,
canary-af-johannesburg-1-backend-8,BACKEND,0,0,0,1,300,1,154,255,0,0,,0,0,0,0,UP,256,1,0,,0,1594,0,,1,13,0,,1,,1,0,,1,,,,0,0,0,1,0,0,,,,1,0,0,0,0,0,0,1585,,,0,734,238,972,,,,,,,,,,,,,,http,,,,,,,,0,1,0,0,0,,,0,734,238,972,0,,,,,256,-,0,0,0,0,0,0,0,0,0,0,0,0,0,
canary-ap-chiyoda-1-backend-9,backend.test-service-regional.ap-chiyoda-1.oci.oraclerealm8.com,0,0,0,1,,1,149,255,,0,,0,0,0,0,UP,256,1,0,0,0,1947439,0,,1,14,1,,1,,2,0,,1,L6OK,,714,0,0,0,1,0,0,,,,1,0,0,,,,,1585,,,0,705,171,876,,,,Layer6 check passed,,2,3,4,,,,,,http,,,,,,,,0,1,0,,,0,,0,705,171,876,0,0,0,0,1,256,-,,,,,,,,,,,,,,
canary-sol-saturn-1-backend-41,backend.test-service-regional.sol-saturn-1.vibe.ca-montreal-1.oci.oracleiaas.com,0,0,0,0,,0,0,0,,0,,0,0,0,0,DOWN,1,1,0,0,1,5189,5189,,1,46,1,,0,,2,0,,0,L4TOUT,,10001,0,0,0,0,0,0,,,,0,0,0,,,,,-1,,,0,0,0,0,,,,Layer4 timeout,,2,3,0,,,,,,http,,,,,,,,0,0,0,,,0,,0,0,0,0,0,0,0,0,1,1,-,,,,,,,,,,,,,,
canary-sol-saturn-1-backend-4000,backend.test-service-regional-4000.sol-saturn-1.vibe.ca-montreal-1.oci.oracleiaas.com,0,0,0,0,,0,0,0,,0,,0,0,0,0,DOWN,1,1,0,0,1,5189,5189,,1,46,1,,0,,2,0,,0,L4TOUT,,10001,0,0,0,0,0,0,,,,0,0,0,,,,,-1,,,0,0,0,0,,,,Layer4 timeout,,2,3,0,,,,,,http,,,,,,,,0,0,0,,,0,,0,0,0,0,0,0,0,0,1,1,-,,,,,,,,,,,,,,
canary-sol-saturn-1-backend-4000,backend.test-service-regional-4000.sol-saturn-1.vibe.us-ashburn-1.oci.oracleiaas.com,0,0,0,0,,0,0,0,,0,,0,0,0,0,UP,1,1,0,0,1,5189,5189,,1,46,1,,0,,2,0,,0,L4TOUT,,10001,0,0,0,0,0,0,,,,0,0,0,,,,,-1,,,0,0,0,0,,,,Layer4 timeout,,2,3,0,,,,,,http,,,,,,,,0,0,0,,,0,,0,0,0,0,0,0,0,0,1,1,-,,,,,,,,,,,,,,
ibex_control-eu-madrid-1-backend-257,controlplane.logging.ad1.eu-madrid-1.oci.oracleiaas.com,0,0,0,0,,0,0,0,,0,,0,0,0,0,DOWN,256,1,0,0,1,5198,5198,,1,262,1,,0,,2,0,,0,L6RSP,,210,0,0,0,0,0,0,,,,0,0,0,,,,,-1,SSL handshake failure,,0,0,0,0,,,,Layer6 invalid response,,2,3,0,,,,,,http,,,,,,,,0,0,0,,,0,,0,0,0,0,0,0,0,0,1,256,-,,,,,,,,,,,,,,
ibex_control-us-gov-manassas-1-backend-283,controlplane.logging.ad1.us-gov-manassas-1.oci.oracledodrealm.ic.gov,0,0,0,0,,0,0,0,,0,,0,0,0,0,MAINT (resolution),256,1,0,0,1,5199,5199,,1,288,1,,0,,2,0,,0,,,,0,0,0,0,0,0,,,,0,0,0,,,,,-1,,,0,0,0,0,,,,,,,,,,,,,,http,,,,,,,,0,0,0,,,0,,0,0,0,0,0,0,0,0,1,256,-,,,,,,,,,,,,,,`;

export const allBackends: BackendProps[] = Object.entries(module.exports)
  .filter((e: [string, unknown]) => e[0].includes('Backend') && !!e[1])
  .map((e: [string, unknown]) => e[1]) as BackendProps[];
