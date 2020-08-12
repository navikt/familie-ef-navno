var path = require('path');
const express = require('express');
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/status', (req, res) => {
    res.status(200).end();
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build/', 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
