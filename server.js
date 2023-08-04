const express = require('express');
const app = express();
const port = 8080;

const utledReferer = (request) => request.headers ? request.headers.referer : undefined;

app.get('/status', (req, res) => {
    res.status(200).end();
});

app.use("/familie/alene-med-barn/overgangsstonad", (req, res) => {
    console.log(`Redirecter fra /familie/alene-med-barn/overgangsstonad med referer ${utledReferer(req)}`);
    res.redirect("https://www.nav.no/overgangsstonad-enslig");
});

app.use("/familie/alene-med-barn/barnetilsyn", (req, res) => {
    console.log(`Redirecter fra /familie/alene-med-barn/barnetilsyn med referer ${utledReferer(req)}`);
    res.redirect("https://www.nav.no/barnetilsyn-enslig");
});

app.use("/familie/alene-med-barn/skolepenger", (req, res) => {
    console.log(`Redirecter fra /familie/alene-med-barn/skolepenger med referer ${utledReferer(req)}`);
    res.redirect("https://www.nav.no/skolepenger-enslig");
});

app.use("/familie/alene-med-barn/tilleggsstonader", (req, res) => {
    console.log(`Redirecter fra /familie/alene-med-barn/tilleggsstonader med referer ${utledReferer(req)}`);
    res.redirect("https://www.nav.no/tilleggsstonader-enslig");
});

app.use("/familie/alene-med-barn/hva-naa", (req, res) => {
    console.log(`Redirecter fra /familie/alene-med-barn/hva-naa med referer ${utledReferer(req)}`);
    res.redirect("https://www.nav.no/alene-med-barn");
});

app.use("/familie/alene-med-barn/", (req, res) => {
    console.log(`Redirecter fra /familie/alene-med-barn/ med referer ${utledReferer(req)}`);
    res.redirect("https://www.nav.no/alene-med-barn");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
