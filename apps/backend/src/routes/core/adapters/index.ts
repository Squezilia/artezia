import { Hono } from 'hono';

export default new Hono()
  // TODO: Implement create endpoint
  .post('/create', ({ status, json, body, req }) => {
    return json('not implemented', 501);
  })
  // TODO: Implement delete endpoint
  .delete('/delete', ({ status, json, body, req }) => {
    return json('not implemented', 501);
  })
  // TODO: Implement update endpoint
  .patch('/update', ({ status, json, body, req }) => {
    return json('not implemented', 501);
  })
  // TODO: Implement get endpoint
  .get('/get', ({ status, json, body, req }) => {
    return json('not implemented', 501);
  })
  // TODO: Implement get one endpoint
  .get('/get/:id', ({ status, json, body, req }) => {
    return json('not implemented', 501);
  });
