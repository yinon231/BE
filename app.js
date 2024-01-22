const http = require('http');
const morgan = require('morgan');
const { router } = require('./router');

const server = http.createServer((req, res) => {
  // Use Morgan middleware for logging HTTP requests
  morgan('combined')(req, res, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    // Your router logic
    router(req, res);
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});