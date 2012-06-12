// var agent = require('webkit-devtools-agent');

var http = require('http'),
    formidable = require('formidable'),
    express = require('express'),
    server;


var app = module.exports = express.createServer();
app.use(express.bodyParser());

http.globalAgent.maxSockets = 10;

app.listen(3003);

app.get('/', function(req, res) {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
              "<!DOCTYPE html>\n" +
              '<html lang="en" id="node-api">' +
              '<head>' +
              '<meta charset="utf-8">' +
              '<title>api</title>' +
              '</head>' +
              '<body>api</body></html>'
    );
});

app.post('/post', function(req, res) {

  console.log('got post');
  console.log(req.body);
  res.send(req.body.stuff, 200);
  res.end();

});

console.log("Express server listening on port %d in %s mode with a pid of %d", app.address().port, app.settings.env, process.pid);

