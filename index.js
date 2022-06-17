// Requires
const app = require('express')();
const http = require('http').createServer(app);
const cors = require('cors');

global.ROOT_DIR = __dirname;

// Database
const { Sequelize, adminDB} = require('./db');

// Sockets.io
require('./startup/sockets')(http);
// Use
app.use(cors());
//Routes
require('./startup/routes')(app);

// Start server
// синхронизация с бд, после успшной синхронизации запускаем сервер
adminDB.sync().then(()=>{
  http.listen(7777, () => {
    console.log('listening on *:7777');
  });
}).catch(err=>console.log(err));
