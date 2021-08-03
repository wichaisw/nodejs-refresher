const http = require('http');
const fs = require('fs');

// execute anonymous callback reqeustListener function when there is request
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if(url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message-input" /><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end();
  }

  if(url === '/message' && method === 'POST') {
    const body = [];

    req.on('data', (chunk) => {
      console.log(chunk)
      body.push(chunk);
    });
    
    return req.on('end',() => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split('=')[1];
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write('<html>');
  res.write('<head><title>First Page</title></head>');
  res.write('<body><h1>Test Node.js server</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(8000, () => {
  console.log("server is running on port 8000");
});