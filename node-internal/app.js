var http = require('http');
var JSONStream = require('jsonstream2');
var fs = require('fs');

var dataUrl = 'http://api.bitcoincharts.com/v1/weighted_prices.json';
var updateInterval = 8.64 * 10000000

setInterval(sourceData, updateInterval);
console.log('Starting 24h countdown to next data-update.');

http.createServer(serverLogic).listen(5000).on('clientError', console.error); 
http.createServer(serverLogic).listen(5001).on('clientError', console.error);
console.log('Running the Node internal on ports 5000 and 5001.');

function serverLogic(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});

  fs.createReadStream('weighted_prices.json')
  .pipe(res);
}

function sourceData() {
  http.get(dataUrl, function(apiResponse) {
    apiResponse.pipe(clientRes);
  });
}

