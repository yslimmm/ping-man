const express = require('express');
const ping = require('ping');
const router = express.Router();
const utils = require('../utils');
const config = require('../config');
const signale = require('signale').scope('index');
const pingList = process.env.PING_LIST || config.ping_list;

// GET /index page
router.get('/', (req, res) => {
  const ip = req.app.get('ip');
  const port = req.app.get('port');

  if(!pingList) {
    return res.json('ping list is undefined.').end();
  }

  let array;

  if(!Array.isArray(pingList)) {
    array = JSON.parse(pingList);
  } else {
    array = pingList
  }

  const renderList = {
    title: 'PING MAN',
    endpoint: ip + ":" + port + "/ping",
    pingList: array,
  };

  return res.render('index', renderList);

});

router.get('/ping', async (req, res) => {
  let result = await ping.promise.probe(req.query.host);
  signale.info(`[/pingman/ping] [${req.query.host}] alive is ${result.alive}`);
  return res.status(200).json(result.alive).end();
});

router.get('/pingall', async (req, res) => {
  let array;

  if(!Array.isArray(pingList)) {
    array = JSON.parse(pingList);
  } else {
    array = pingList
  }

  for(let item of array) {
    await ping.promise.probe(item.host, {
      timeout: 10  
    })
    .then((res) => {
      item.status = res.alive;
      if(!item.status) {
        signale.error(`[/pingman/pingall] [${item.host}] alive is ${item.status}`);
        utils.sendTeamsError(item.host);
      } else {
        signale.info(`[/pingman/pingall] [${item.host}] alive is ${item.status}`);
      }
    });
  }

  return res.status(200).json(array).end();
});

module.exports = router;
