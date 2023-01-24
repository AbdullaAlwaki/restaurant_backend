const express = require('express');
const { router } = require('./router/user.router');
const { db } = require('./helper/db');

db();
const app = express();
const port = process.env.PORT || 5000;
app.use('/api',router)
.listen(port, () => console.log(`Listening on port http://localhost:${port}`));


