const express = require('express');
const path = require('path');

// express return a requestHandler
const app = express();

const adminRoutes = require('./routes/admin');
const shopRouters = require('./routes/shop');

const errorController = require('./controllers/error');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// use middleware, callback in .use() will run everytime the server receive any reqeust
app.use((req, res, next) => {
  // console.debug('in the middleware')
  next();
});

app.use('/admin', adminRoutes);
app.use('/shop', shopRouters);

// catch all, path '/' by deafult
app.use(errorController.get404);

app.listen(8000, () => {
  console.log('Express server is running on port 8000')
});