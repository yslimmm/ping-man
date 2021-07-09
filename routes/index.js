const config = require('../config');
const express = require('express');
const ping = require('ping');
const router = express.Router();
const { IncomingWebhook } = require('ms-teams-webhook');

const url = process.env.MS_TEAMS_WEBHOOK_URL || config.ms_teams_webhook_url;
const webhook = new IncomingWebhook(url);
const pingList = process.env.PING_LIST || config.ping_list;

const sendTeamsError = (host) => {
  webhook.send(JSON.stringify({
    "@type": "MessageCard",
    "@context": "https://schema.org/extensions",
    "summary": "Ping-Man",
    "themeColor": "0078D7",
    "title": `Ping-Man Message: \"&#x1F525 not working ${host}.\"`,
    "sections": [
      {
        "activityTitle": "Ping Man",
        "activitySubtitle": new Date(),
        "activityImage": "https://connectorsdemo.azurewebsites.net/images/MSC12_Oscar_002.jpg",
  
        "text": `서버 ${host} 이/가 다운이 되었습니다. 서버를 확인해 주세요.`
      }
    ]
  }));
  
};


// GET /index page
router.get('/', (req, res) => {
  const ip = req.app.get('ip');
  const port = req.app.get('port');

  if(!pingList) {
    return res.json('ping list is undefined.').end();
  }

  const renderList = {
    title: 'PING MAN',
    endpoint: ip + ":" + port + "/ping",
    pingList: pingList,
  };

  return res.render('index', renderList);

});

router.get('/ping', async (req, res) => {
  let result = await ping.promise.probe(req.query.host);
  return res.status(200).json(result.alive).end();
});

router.get('/pingall', async (req, res) => {
  for(let item of pingList) {
    await ping.promise.probe(item.host, {
      timeout: 10  
    })
    .then((res) => {
      item.status = res.alive;
      if(!item.status) {
        sendTeamsError(item.host);
      }
    });
  }
  return res.status(200).json(pingList).end();
});

module.exports = router;
