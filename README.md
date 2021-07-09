# Ping-Man
ping을 이용한 모니터링 서비스

# Running on Node Server
support: NodeJS(v10.15)
preinstalled: PM2
```console
$ npm install
$ pm2 start ecosystem.config.js --env production
```

# API's
|  Method | url |  Parameter | Description | response |
|:--------:|:--------:|:--------:|:--------|:--------|
| GET      | /pingman | -        | 모니터링 웹 페이지||
| GET      | /pingman/ping| ?host= | host의 ping 상태|true|false|
| GET      | /pingman/pingall| - | 설정된 host의 전체 ping 결과 | { name: string , host: string, status: boolean}|