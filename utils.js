const config = require('./config');
const { IncomingWebhook } = require('ms-teams-webhook');
const url = process.env.MS_TEAMS_WEBHOOK_URL || config.ms_teams_webhook_url;
const webhook = new IncomingWebhook(url);

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

module.exports = {
	sendTeamsError
};