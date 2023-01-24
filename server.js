const express = require('express');

import tableRouter from './router/tables.js';

// ROUTES
app.use('/table', tableRouter);

const app = express();
const port = process.env.PORT || 5000;
app
  .get('/api', (req, res) => {
    res.send('Hello World');
  })
  .listen(port, () =>
    console.log(`Listening on port http://localhost:${port}`)
  );
