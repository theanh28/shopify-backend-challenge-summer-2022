require('dotenv').config();
const config = require('./config');
const server = require('http').createServer();
const expressApp = require('./express');
const { connectDb } = require('./utils/mongoDb');

connectDb(config.mongoUrl).then(() => {
  // the expressApp (in ./express) is our application. Follow to see more.
  server.on('request', expressApp);

  server.listen(config.port, () => {
    console.info(`SERVER IS RUNNING AT PORT ${config.port}`);
  });
})