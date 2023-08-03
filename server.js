var path = require('path');
const express = require('express');
const app = express();
const port = 8080;
const router = express.Router();
router.use(express.static(path.join(__dirname, 'build')));

router.get('/status', (req, res) => {
    res.status(200).end();
});
app.get('/status', (req, res) => {
    res.status(200).end();
});

app.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) => {
    res.sendFile(path.join(__dirname, 'build/', 'index.html'))
})

app.use("/familie/alene-med-barn/", router);

app.listen(port, () => console.log(`Listening on port ${port}`));
