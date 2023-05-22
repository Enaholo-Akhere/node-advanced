const express = require('express');
const app = express();


require('./startup/app-router')(app);
require('./startup/database-connection')(app);
require('./startup/logging')();
require('./startup/config')();

 
