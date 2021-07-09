const express = require('express');
const ping = require('ping');
const router = express.Router();
const utils = require('../utils');
const config = require('../config');
const pingList = process.env.PING_LIST || config.ping_list;

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
        utils.sendTeamsError(item.host);
      }
    });
  }
  return res.status(200).json(pingList).end();
});

module.exports = router;
