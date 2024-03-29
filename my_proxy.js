// run this locally
// var agent = require('webkit-devtools-agent');

var http = require('http'),
    express = require('express'),
  qs = require('qs'),
    server;


var app = module.exports = express.createServer();
app.use(express.bodyParser());

http.globalAgent.maxSockets = 10;

app.listen(8080);


app.get('/', function(req, res) {
    res.writeHead(200, {'content-type': 'text/html'});
    var mem = process.memoryUsage();
    res.end(
      'proxy'
    );
});

app.post('/post', function(req, response) {

  var headers = req.headers;
  headers['host'] = 'www.codebelay.com';
  var options = {
    host: 'www.codebelay.com', // point to a remote server. this is just localhost as an example.
    port: 80,
    path: req.path + '/',
    headers: headers,
    method: req.method,
    url: req.url,
  };

  console.log('options');
  console.log(options);
  console.log('req.params');
  console.log(req.params);
  var data = '';
  var api_req = http.request(options, function(res) {
    console.log("6 Got response again: " + res.statusCode);
    res.on('error', function(e) {
      console.log('api failure');
      response.writeHead(res.statusCode, res.headers);
      response.end(res.body);

    });

    res.on('data', function(chunk) {
      data += chunk;
    });

    res.on('end', function() {
      response.writeHead(res.statusCode, res.headers);
      response.end(data);
    });

  });
  api_req.write(qs.stringify(req.body));
  api_req.end();


});
console.log("Express server listening on port %d in %s mode with a pid of %d", app.address().port, app.settings.env, process.pid);

