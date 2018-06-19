'use strict';

import superagent from 'superagent';
import app from '../src/app.js';

describe('API module', () => {

  beforeAll(() => {
    app.start(3000);
  });

  afterAll(() => {
    app.stop();
  });


  it('should return with an error status of 400 when a badID is returned', (done) => {

    return superagent.get('http://localhost:3000/api/v1/badID')
      .catch(err => {
        // expect(err.responseText).toBe('bad request');
        expect(err.status).toBe(404);
        done();
      });
  });

  it('handles a good post request', (done) => {

    let obj = {
      title: 'corndog',
      content: 'this is a corndog',
    };

    superagent.post('http://localhost:3000/api/v1/food')
      .send(obj)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.text).id).toEqual(obj.title);
      })
      .catch(console.err);
    done();
  });

  it('handles a bad post request', (done) => {

    superagent.post('http://localhost:3000/api/v1/food')
      .then(response => {
        expect(response.statusCode).toBe(400);
      });
    done();
  });
  
  it('should delete entry when given specified id', (done) => {
    let obj = {
      title: 'sushi',
      content: 'this is a sushi',
    };
    superagent.post('http://localhost:3000/api/v1/food/')
      .send(obj)
      .then(() => {
        superagent.delete('http://localhost:3000/api/v1/food/:id')
          .then(response => {
            console.log(response.body);
            expect(response.status).toEqual(204);
          });
      });
    done();
  });
});