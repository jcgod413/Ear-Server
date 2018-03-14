/**
 * Module dependencies.
 * 모듈을 추가합니다.
 */
const express = require('express');
const path = require('path');
const routes = require('./routes');
const push = require('./push');
const config = require('./config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { passport } = require('./auth');

// 웹 서버를 생성합니다.
const app = express();

// 미들웨어를 설정합니다.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('short'));

app.listen(config.SERVER_PORT, () => {
  console.log('Server is running on %d port', config.SERVER_PORT);
});

app.use('/', routes);
app.get('/push', push.pushServer.test);

app.post('/deploy', (req, res) => {
  console.log('Github Hook received!');

  var spawn = require('child_process').spawn,
      deploy = spawn('sh', [ './deploy.sh' ]);

  res.status(200).send();
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
