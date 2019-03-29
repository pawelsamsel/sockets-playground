const express = require('express');
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy');
const expressProxy = require('express-http-proxy');
var httpProxyMiddleware = require('http-proxy-middleware');

require('dotenv').config();

const getExampleHandler = require('controllers/api/example/getExample');


const APP_DIR = 'client/build';
const WEBPACK_PORT = 9090;
const WEBPACK_URL = `http://localhost:${WEBPACK_PORT}`;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const http = require('http').Server(app);
const io = require('socket.io')(http);

// API
app.get('/api/example/example', getExampleHandler);

// Sockets Handler
io.on('connection', function(socket){
  console.log('user connected', socket.id);

  io.of('/').clients((error, clients) => {
    if (error) throw error;
    console.log('clients', clients); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
  });

  const intervalId = setInterval(() => {
    socket.emit('message', {data: 'example data'});
  }, 10000);

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    clearInterval(intervalId);
  });
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, APP_DIR)));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, APP_DIR, 'index.html'));
  });
} else {

  const wsProxy = httpProxyMiddleware('/', {
    target: WEBPACK_URL,
    ws: true, // enable websocket proxy
    logLevel: 'warn'
  });

  app.use('*', (req, res, next) => {
    if (req.baseUrl.indexOf('socket.io') === -1) {
      wsProxy(req, res, next)
    }
  });
}

http.listen(PORT, () => console.log(`Listening on port ${PORT}`));
