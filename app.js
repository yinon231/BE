const http = require('http');
const { router } = require('./router');
const logger = require('./logger');
const server = http.createServer((req, res) => {
  router(req, res);
 
 
});

server.listen(3000, () => {
});