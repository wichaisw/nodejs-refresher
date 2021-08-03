const http = require('http');
const routes = require('./routes');

// execute anonymous callback reqeustListener function when there is request
const server = http.createServer(routes.requestHandler);

server.listen(8000, () => {
  console.log("server is running on port 8000");
});