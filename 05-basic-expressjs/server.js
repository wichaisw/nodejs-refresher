const http = require('http');

const express = require('express');

// express return a requestHandler
const app = express();

// use middleware, callback in .use() will run everytime the server receive any reqeust
app.use((req, res, next) => {
  console.log('in the middleware')
  next();
});

app.use((req, res, next) => {
  console.log('another middleware')
  res.status(200).send('<h1>From Express</h1>');
});

app.listen(8000, () => {
  console.log('Express server is running on port 8000')
});