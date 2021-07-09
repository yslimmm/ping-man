# Ping-Man
ping을 이용한 모니터링 서비스

# Running on Node Server
support: NodeJS(v10.15)
preinstalled: PM2
```console
$ npm install
$ pm2 start ecosystem.config.js --env production
```
# Scheduler
하루에 한번씩 스케줄링을 통하여 ping 결과를 받고 다운된 서버는 Teams 커넥터를 통해 알림한다.

# API's
|  Method | url |  Parameter | Description | response | TeamsNoti |
|:--------:|:--------:|:--------:|:--------|:--------|:--------|
| GET      | /pingman | -        | 모니터링 웹 페이지|x|x|
| GET      | /pingman/ping| ?host= | host의 ping 상태|true/false|x|
| GET      | /pingman/pingall| - | 설정된 host의 전체 ping 결과 | { name: string , host: string, status: boolean}|o|