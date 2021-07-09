const signale = require('signale').scope('scheduleService');
const ping = require('ping');
const utils = require('../utils');
const config = require('../config');
const pingList = process.env.PING_LIST || config.ping_list;

const job = async (jobTransaction) => {
	signale.info(`[${jobTransaction}] job working...`);

	for(let item of pingList) {
    await ping.promise.probe(item.host, {
      timeout: 10  
    })
    .then((res) => {
      item.status = res.alive;
      if(!item.status) {
				signale.error(`[${jobTransaction}] [${item.host}] alive is ${item.status}`);
        utils.sendTeamsError(item.host);
      }
    });
	}
	signale.success(`[${jobTransaction}] end job.`);
};

module.exports = {
	job
};