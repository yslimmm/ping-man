const config = require('./config');
const schedule = require('node-schedule');
const logger = require('signale').scope('scheduler');
const scheduleCron = process.env.SCHEDULE_CRON || config.schedule_cron;
const scheduleService = require('./scheduler/scheduleService');

const scheduler = schedule.scheduleJob(scheduleCron, function() {
	const jobTransaction = new Date();
	logger.start(`[${jobTransaction}] start job.`);
	scheduleService.job(jobTransaction);
});

module.exports = scheduler;