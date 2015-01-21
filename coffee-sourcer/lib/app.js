// Generated by CoffeeScript 1.8.0
(function() {
  var extractByCurrency, fetchData, fs, http, inFile, request, server, serverLogic, snippetLogic, snippetServer, url;

  request = require('request');

  http = require('http');

  url = require('url');

  fs = require('fs');

  inFile = fs.createWriteStream('snapshot.json');

  extractByCurrency = function(jsonDoc, currency) {
    var doc;
    doc = JSON.parse(jsonDoc);
    return doc[currency];
  };

  fetchData = function() {
    return request.get('https://api.bitcoinaverage.com/all').pipe(inFile).on('close', function() {
      return console.log('JSON snapshot saved.');
    }).on('error', function(reason) {
      return console.log("" + reason);
    });
  };

  serverLogic = function(req, res) {
    return fs.exists('snapshot.json', function(exists) {
      if (exists) {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });
        return fs.createReadStream('snapshot.json').pipe(res).on('close', function() {
          return res.end();
        });
      } else {
        return res.end(new Error('The resource could not be located.'));
      }
    });
  };

  snippetLogic = function(req, res) {
    var currency;
    currency = url.parse(req.url).path;
    return fs.readFile('snapshot.json', function(err, data) {
      var dataObj;
      if (!err) {
        dataObj = JSON.parse(data.toString());
        return res.end(JSON.stringify(dataObj[currency.slice(1, currency.length)].averages));
      }
    });
  };

  fetchData();

  server = http.createServer(serverLogic);

  server.listen(9999);

  snippetServer = http.createServer(snippetLogic);

  snippetServer.listen(8888);

  process.on('exit', function(code) {
    console.log("The application closed with code, " + code + ".");
    clearInterval(getterInterval);
    return server.close();
  });

}).call(this);