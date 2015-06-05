var http = require('http');

var PORT = 8000;

http.createServer()
  .on('request', function(req, res) {
    console.log('Url: ' + req.url);

    res.writeHead(200, "OK", {
      'Content-Type': 'text/plain'
    });
    res.end('Success');
  })
  .listen(PORT);

console.log('HTTP server started (port ' + PORT + ')');
