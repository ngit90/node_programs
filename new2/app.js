
var http = require('http');

const server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  if(req.method == "GET"){
    if(req.url == '/new'){
      res.end("data saved success");
    }
  }
  res.end('Hello World!');
});

server.listen(8080);

