const express = require('express');
require('dotenv').config();
const restFul = require('express-method-override')('_method'),
  morgan = require('morgan'),
  cors = require('cors'),
  app = express(),
  ioServer = require('./server/index')(app),
  port = (process.env.PORT || 3001),
  mongoService = require('./services/mongoService'),
  indexRouter = require('./routes/index');

/*MongoDB*/
mongoService.init();


app.set("port", port);

/*
Middlewares
*/
app.set('trust proxy', true);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(restFul);

/*
  Global variables
*/
app.use((req, res, next) => {
  next();
});

indexRouter.index(app);

/*
  Route not found 404
*/
app.use(function (req, res, next) {
  return res.status(404).send({ message: 'Route ' + req.url + ' Not found.' });
});

/*
  Server start
*/
ioServer.listen(port, () => {
  console.log(`Server started on port`, port);
  console.log(`Socket server running`);
});



