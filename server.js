const express = require('express');


const app = express();
const port = process.env.PORT || 5000;
app.get('/api', (req, res) => {
    res.send('Hello World');
})
.listen(port, () => console.log(`Listening on port http://localhost:${port}`));


