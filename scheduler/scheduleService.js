const signale = require('signale').scope('scheduleService');
const ping = require('ping');
const utils = require('../utils');
const config = require('../config');
const pingList = process.env.PING_LIST || config.ping_list;

const job = async (jobTransaction) => {
  signale.info(`[${jobTransaction}] job working...`);
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
        signale.error(`[${jobTransaction}] [${item.host}] alive is ${item.status}`);
        utils.sendTeamsError(item.host);
      } else {
        signale.info(`[${jobTransaction}] [${item.host}] alive is ${item.status}`);
      }
    });
  }
  
	signale.success(`[${jobTransaction}] end job.`);
};

module.exports = {
	job
};