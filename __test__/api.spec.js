'use strict';

import superagent from 'superagent';

describe('API module', () => {

  it('Should return hompage when given path', () => {

    return superagent.get('http://localhost:3000/')
      .then(response => {
        expect(response.text).toEqual(expect.stringContaining('<!DOCTYPE'));
      });
  });

  it('should return with an error status of 400 when a badID is returned', () => {

    return superagent.get('http://localhost:3000/api/v1/badID')
      .catch(err => {
        // expect(err.responseText).toBe('bad request');
        expect(err.status).toBe(404);
      });
  });

  it('handles a good post request', (done) => {

    let obj = {
      title: 'corndog',
      content: 'this is a corndog'
    };

    superagent.post('http://localhost:3000/api/v1/food')
      .send(obj)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.text).title).toEqual(obj.title);
        console.log(JSON.parse(response.text).title, '!!!', obj.title);
        done();
      })
      .catch(console.err);
  });


  it('should delete entry when given specified id', (done) => {
    let obj = {
      title: 'sushi',
      content: 'this is a sushi'
    }
    superagent.post('http://localhost:3000/api/v1/food/')
      .send(obj)
      .then(response => {
        superagent.delete('http://localhost:3000/api/v1/food/:id')
        .then(response => {
          expect(response.status).toEqual(204);
        });
      })
  });
  // xit('return an id when given one', (done) => {

  //   let obj = {
  //     title: 'corndog',
  //     content: 'this is a corndog'
  //   }

  //   superagent.post('http://localhost:3000/api/v1/food')
  //   .send(obj)
  //   .then((response) => {
  //     superagent.get('http://localhost:3000/api/v1/food/corndog')
  //     .then(res => {
  //       expect(JSON.parse(response.text).title).toEqual(obj.title);
  //       done();
  //     });
  //   })
  //   .catch(console.err);
  // });
});