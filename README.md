# asic-alert
Sends slack alerts of the *offline* or *under performing* workers/rigs.
Create [slack app](https://api.slack.com/apps) and get slack webhook url


### install
```
git clone https://github.com/wattflare/asic-alert.git
cd asic-alert
npm install
```
### create config files
```
touch accessToken.json
touch execptionList.json
```
#### sample content of accessToken.json
Get access token from slushpool.com
```
[
	"XXXXXXX-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", 
	"XXXXXXX-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
]
```
#### sample content of execptionList.json
known sick workers list with expected hashrate
```
{
	"user_name.worker_name": {"hashrate": 9500000},
	"user_name.worker_name": {"hashrate": 9500000}
}
```
### test
`node check-asic-status.js` or `./asic-alert.sh`
### install crontab
Edit `asic-alert.sh` and `asic-alert.crontab` to change file path. By default cron runs every 15 minutes.
#### For easy installation of crontab, run the following command
`./install-crontab.sh` Appends cronjob to existing crontab  
### test crontab installaton
`cat ./cron.log`
