'use strict';

import express from 'express';
import router from '../api.js';
// import api from '../src/lib/api.js';

let app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);

let isRunning = false;

module.exports = {
  start: (port) => {
    if (!isRunning) {
      app.listen(port, (err) => {
        if (err) {
          throw err;
        }
        isRunning = true;
        console.log('Server is up on port', port);
      });
    } else {
      console.log('Server is already running');
    }
  },

  stop: () => {
    app.close(() => {
      isRunning = false;
      console.log('Server has been stopped');
    });
  },
};