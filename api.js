'use strict';

import express from 'express';
const router = express.Router();

import Foods from './src/models/foods.js';

import fs from 'fs';

let sendJSON = (res, data) => {
  res.statusCode = 200;
  res.statusMessage = 'good';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
};

let serverError = (res, err) => {
  let error = {
    error: err
  };
  res.statusCode = 500;
  res.statusMessage = 'Server Error';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};

router.get('/', (req, res) => {

  fs.readFile('index.html', (err, data) => {

    let dataString = data.toString();
    let filler = 'This is the homepage'
    res.write(dataString.replace('{{filler}}', filler));
    res.end();

  });
});

router.get('/api/v1/food', (req, res) => {
  Foods.fetchAll()
    .then(data => sendJSON(res, data))
    .catch(err => serverError(res, err));
});

router.get('/api/v1/food/:id', (req, res) => {

  Foods.findOne(req.params.id)
    .then(data => sendJSON(res, data))
    .catch(err => serverError(res, err));
  console.log('!!!!!!!!!!!!', req.params.id);

});

router.delete('api/v1/food/:id', (req, res) => {
  if (req.params.id) {
    Foods.deleteOne(req.params.id)
      .then(() => {
        res.statusCode = 204;
        res.statusMessage = 'success';
        res.write(req.params.id, ': was deleted');
        res.end();
      })
      .catch(console.error);
  }
});

router.post('/api/v1/food', (req, res) => {
  let newFoods = new Foods(req.body);

  newFoods.save()
    .then(data => sendJSON(res, data))
    .catch(console.error);
});

export default router;