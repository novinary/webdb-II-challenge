const express = require("express");
const helmet = require("helmet");
const server = express();
const zooRouter = require('./zooRouter');
const bearRouter = require('./bearRouter');

server.use(express.json());
server.use(helmet());

server.use('/api/zoos', zooRouter);
server.use('/api/bears', bearRouter);

const port = 3300;
server.listen(port, function () {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
