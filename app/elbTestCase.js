var express = require('express');
var app = express();

var reqId = 0;

//app.param('uid', /^\d+$/);


app.get('/hello/:uid', function(req, res, next){
  var result = {
    requestId: ++reqId,
    uid: req.params.uid,
    requestIps: req.ips,
    host: getHostName(),
    timestamp: new Date().getTime()
  };

  console.log('[RequestLog] ', result);

  res.cookie('uid', req.params.uid, {expires: new Date(Date.now() + 900000), httpOnly:true});
  res.send(JSON.stringify(result));
});



var server = app.listen(8000, function() {
    console.log('Server Listening on port %d', server.address().port);
});

function getHostName() {
  var os = require('os');  
  var hostName=os.hostname();  
  return hostName;
}

