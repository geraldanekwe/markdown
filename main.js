var fs = require("fs"),
  http = require('http'),
  url = require('url'),
  index = fs.readFileSync('index.html'),
  marked = require('marked');



http.createServer(responseHandler).listen(process.env.PORT || 8887);

function responseHandler(req, res) {
  if (req.url.match('fav')) {
    res.write(data);
    res.end('');
    return;
  }
  res.writeHead(200, {
    "Content-Type": "text/html"
  });
  if (req.url === '/') {
    fs.readFile("index.html", "utf8", function(err, data) {
      res.end(data);
    });
  } else if (req.url.match("/markdown/")) {
    var data = "";
    var markedStr = req.url.replace(/[\/][A-z]+[\/]/g, '');
    data = marked(decodeURIComponent(markedStr));
    res.end(data);
  } else {
    res.end();
  }
}
