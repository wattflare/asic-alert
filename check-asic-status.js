const request = require('request');
const fs = require('fs');
const accessToken = require('./accessToken.json');
const exceptionList = require('./execptionList.json');
//const accessToken = JSON.parse(fs.readFileSync('accessToken.json', 'utf8'));
//const exceptionList = JSON.parse(fs.readFileSync('execptionList.json', 'utf8'));

const slack_webhook_url = "https://hooks.slack.com/services/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";

const slush_pool = {
  type: "slushpool",
  url: "https://slushpool.com/accounts/profile/json/",
  accounts: accessToken
};

//Check Slushpool pool status
Object.keys(slush_pool.accounts).forEach(function(account) {
  console.log("Checking slushpool pool status");
  checkWorkerStatus(slush_pool.url, slush_pool.accounts[account]);
});


function sendAlert(alertMessage){
  console.log("sending slack alert... " + alertMessage);
  request.post({
    url: slack_webhook_url, 
    json: {text: alertMessage}
    }, function(err,httpResponse,body){ 
        if (err) { return console.log(err); }
          console.log("alert sent");
    });
}

function checkWorkerStatus(apiUrl, account){
  var workerAPIUrl = apiUrl + account;
  request(workerAPIUrl, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log("account: " + account);
    
    if(body && body.workers) {
      Object.keys(body.workers).forEach(function(worker) {
        console.log(worker + " is alive " + body.workers[worker].alive);
        if(body.workers[worker].alive === false){
          var alertMessage = worker + " is offline";
          console.log(alertMessage);
          sendAlert(alertMessage);
        }
        if(body.workers[worker].alive && (body.workers[worker].hashrate < 14100000)){
          if(exceptionList[worker] && (body.workers[worker].hashrate >= exceptionList[worker].hashrate)) {
            return;
          }
          var alertMessage = worker + " is *under* performing: " + body.workers[worker].hashrate;
          //var infoMessage = '\n to check status, log in to http://192.168.1.XX/check';
          //alertMessage = alertMessage + infoMessage;
          console.log(alertMessage);
          console.log(body.workers[worker]);
          sendAlert(alertMessage);
        }
      });
    }
  });
}


