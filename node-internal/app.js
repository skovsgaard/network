var http = require('http');
var JSONStream = require('jsonstream2');
var fs = require('fs');
var url = require('url');

//var dataUrl = 'http://api.bitcoincharts.com/v1/weighted_prices_pretty.json';
//var updateInterval = 8.64 * 10000000 // 24h in ms

//setInterval(sourceData, updateInterval);
//console.log('Starting 24h countdown to next data-update.');

http.createServer(serverLogic)
  .listen(5000)
  .on('clientError', console.error); 

http.createServer(serverLogic)
  .listen(5001)
  .on('clientError', console.error);

console.log('Running the Node internal on ports 5000 and 5001.');

function serverLogic(req, res) {
  var params = url.parse(req.url).query.split('=');

  res.writeHead(200, {'Content-Type': 'application/json'});

  fs.exists('weighted_prices_pretty.json', function(exists) {
    if (exists) {
      fs.readFile('weighted_prices_pretty.json', function(err, data) {
	if (err) {
	  console.log(err);
	} else {
	  var resObj = {};
	  resObj = JSON.parse(data)[params[1]];
	  console.log(JSON.stringify(resObj));
	  res.end(JSON.stringify(resObj));
	}
      });
    } else {
      res.end('{"response": ""}');
    }
  });
}

//function sourceData() {
//  http.get(dataUrl, function(apiResponse) {
//    apiResponse
//    .pipe(fs.createWriteStream('weighted_prices_pretty.json'))
//  });
//}

