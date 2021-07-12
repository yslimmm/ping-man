module.exports = {
  apps : [{
    name: "pingman",
    script: './bin/www',
		log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS',
    shutdown_with_message: true,
    env: {
      NODE_IP: '127.0.0.1',
      NODE_PORT: 5338,
      NODE_ENV: 'development',
      MS_TEAMS_WEBHOOK_URL: 'https://selvaso365.webhook.office.com/webhookb2/d47597fb-d165-43e1-be76-f22fac19516f@cc51d85f-762a-4d3b-923e-d362382d75d4/IncomingWebhook/3a7dc5e6193847249a55268cfc455943/2d8df388-afcf-49c7-9d7c-eb4c5a474775',
      SCHEDULE_CRON: '*/1 * * * *',
      PING_LIST: [{
        name: 'IDC 경찰청',
        host: 'stenoselvy.com'
      }, {
        name: 'NSV-21-001(medivocie)',
        host: '220.86.110.187'
      }, {
        name: 'NSV-21-002(stenoselvy)',
        host: '220.86.110.188'
      }, {
        name: 'NSV-21-003(police)',
        host: '220.86.110.189'
      }, {
        name: 'IDC MediVoice',
        host: 'finger.selvy.ai'
      }, {
        name: 'IDC LawTop - 1',
        host: '218.145.31.25'
      }, {
        name: 'IDC LawTop - 2',
        host: '218.145.31.26'
      }, {
        name: '192.168.18.96',
        host: '192.168.18.96'
      }]
		},
		env_production: {
      NODE_IP: '127.0.0.1',
      NODE_PORT: 5338,
      NODE_ENV: 'production',
      MS_TEAMS_WEBHOOK_URL: 'https://selvaso365.webhook.office.com/webhookb2/d47597fb-d165-43e1-be76-f22fac19516f@cc51d85f-762a-4d3b-923e-d362382d75d4/IncomingWebhook/3a7dc5e6193847249a55268cfc455943/2d8df388-afcf-49c7-9d7c-eb4c5a474775',
      SCHEDULE_CRON: '*/1 * * * *',
      PING_LIST: [{
        name: 'IDC 경찰청',
        host: 'stenoselvy.com'
      }, {
        name: 'NSV-21-001(medivocie)',
        host: '220.86.110.187'
      }, {
        name: 'NSV-21-002(stenoselvy)',
        host: '220.86.110.188'
      }, {
        name: 'NSV-21-003(police)',
        host: '220.86.110.189'
      }, {
        name: 'IDC MediVoice',
        host: 'finger.selvy.ai'
      }, {
        name: 'IDC LawTop - 1',
        host: '218.145.31.25'
      }, {
        name: 'IDC LawTop - 2',
        host: '218.145.31.26'
      }, {
        name: '192.168.18.96',
        host: '192.168.18.96'
      }]      
		},
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
