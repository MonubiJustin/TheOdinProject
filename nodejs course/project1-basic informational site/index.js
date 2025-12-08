const http = require("node:http");
const fs = require("fs");

const content_type = { "content-type": "text/html" };

const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    const data = await fs.readFileSync(__dirname + "\\index.html");
    res.writeHead(200, content_type);
    res.end(data);
  } else if (req.url === "/about") {
    const data = await fs.readFileSync(__dirname + "\\about.html");
    res.writeHead(200, content_type);
    res.end(data);
  } else if (req.url === "/contact-me") {
    const data = await fs.readFileSync(__dirname + "\\contact-me.html");
    res.writeHead(200, content_type);
    res.end(data);
  } else {
    const data = await fs.readFileSync(__dirname + "\\404.html");
    res.writeHead(404, content_type);
    res.end(data);
  }
});

server.listen(8080)