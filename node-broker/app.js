var http = require('http');
var url  = require('url');

var tick = 0;

for (var i = 0; i <= 3; i++){
  http.createServer(serverLogic).listen(3000 + i);
  console.log('A broker is up at port  300' + i);
}

function serverLogic(clientReq, clientRes) {
  var path = url.parse(clientReq.url);

  if (tick % 2 == 0) {
    var opts = {port: 5000, path: path.href};
  } else {
    var opts = {port: 5001, path: path.href};
  }

  var params = path.query.split('=');

  console.log(params);

  http.get(opts, function(internalResponse) {
    internalResponse
    .pipe(process.stdout);

    internalResponse
    .pipe(clientRes);
  });
}
