// serverless.js
const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data.js');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/api/data', data.getData);
app.post('/api/data', data.saveData);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
