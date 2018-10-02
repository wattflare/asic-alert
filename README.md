# asic-alert

```
git clone https://github.com/wattflare/asic-alert.git
cd rig-alert
npm install
node check-asic-status.js
```
### Install as crontab
Edit `asic-alert.sh` and `asic-alert.crontab` to change file path. By default cron runs every 15 minutes.
#### For easy installation run the following command
`./install-crontab.sh` Appends cronjob to existing crontab  
