var http = require('http');
var tick = 0;

for (var i = 0; i <= 3; i++){
  http.createServer(serverLogic).listen(3000 + i);
  console.log('A broker is up at port  300' + i);
}

function serverLogic(clientReq, clientRes) {
  if (tick % 2 == 0) {
    var opts = {port: 5000};
  } else {
    var opts = {port: 5001}
  }

  http.get(opts, function(internalResponse) {
    internalResponse
    .pipe(clientRes);
  });
}
