const express = require('express');

const {ServerConfig} = require('./config');
const apiRoutes = require('./routes');

const {Queue} = require('./config')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Server successfully started on port : ${ServerConfig.PORT}`);
  await Queue.connectQueue();
  Queue.consumeQueue();
});

 