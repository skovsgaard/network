var http = require('http');

for (var i = 0; i <= 3; i++){
  http.createServer(serverLogic).listen(3000 + i);
  console.log('A broker is up at port  300' + i);
}

function serverLogic(clientReq, clientRes) {
  http.get({port: 5000}, function(internalResponse) {
    internalResponse
    .pipe(clientRes);
  });
}
