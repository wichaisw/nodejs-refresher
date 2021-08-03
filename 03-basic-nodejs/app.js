const http = require('http');

// execute anonymous callback reqeustListener function when there is request
const server = http.createServer((req, res) => {
  console.log(req)
});

server.listen(8000, () => {
  console.log("server is running on port 8000")
});