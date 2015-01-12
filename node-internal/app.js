var http = require('http');
var JSONStream = require('jsonstream2');
var fs = require('fs');

http.createServer(function(clientReq, clientRes) {
  //var dataUrl = 'http://api.bitcoincharts.com/v1/weighted_prices.json';
  //http.get(dataUrl, function(apiResponse) {
  //  apiResponse
  //  //.pipe(JSONStream.parse(['DKK']))
  //  .pipe(clientRes);
  //});

  fs.createReadStream('weighted_prices.json')
  .pipe(clientRes);
}).listen(5000);

console.log('Running the Node internal on port 5000');
