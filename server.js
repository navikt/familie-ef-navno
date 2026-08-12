const express = require('express');
const app = express();
const port = 8080;

// Referer er ofte undefined pga. Referrer-Policy, personvernfilter i nettleser e.l.
// Sec-Fetch-Site dekker det samme (hvor forespørselen kom fra) selv når referer mangler:
// "none" = direkte navigasjon (skrevet inn URL, bokmerke, lenke i e-post/PDF/QR-kode)
// "cross-site"/"same-site"/"same-origin" = kom fra en lenke på et annet/samme nettsted
const utledOpprinnelse = (request) => {
    const headers = request.headers || {};
    return `referer=${headers.referer ?? 'ingen'} sec-fetch-site=${headers['sec-fetch-site'] ?? 'ingen'}`;
};

app.get('/status', (req, res) => {
    res.status(200).end();
});

app.use("/familie/alene-med-barn/overgangsstonad", (req, res) => {
    console.log(`Redirecter fra /familie/alene-med-barn/overgangsstonad. ${utledOpprinnelse(req)}`);
    res.redirect("https://www.nav.no/overgangsstonad-enslig");
});

app.use("/familie/alene-med-barn/barnetilsyn", (req, res) => {
    console.log(`Redirecter fra /familie/alene-med-barn/barnetilsyn. ${utledOpprinnelse(req)}`);
    res.redirect("https://www.nav.no/barnetilsyn-enslig");
});

app.use("/familie/alene-med-barn/skolepenger", (req, res) => {
    console.log(`Redirecter fra /familie/alene-med-barn/skolepenger. ${utledOpprinnelse(req)}`);
    res.redirect("https://www.nav.no/skolepenger-enslig");
});

app.use("/familie/alene-med-barn/tilleggsstonader", (req, res) => {
    console.log(`Redirecter fra /familie/alene-med-barn/tilleggsstonader. ${utledOpprinnelse(req)}`);
    res.redirect("https://www.nav.no/tilleggsstonader-enslig");
});

app.use("/familie/alene-med-barn/hva-naa", (req, res) => {
    console.log(`Redirecter fra /familie/alene-med-barn/hva-naa. ${utledOpprinnelse(req)}`);
    res.redirect("https://www.nav.no/alene-med-barn");
});

app.use("/familie/alene-med-barn/", (req, res) => {
    console.log(`Redirecter fra /familie/alene-med-barn/. ${utledOpprinnelse(req)}`);
    res.redirect("https://www.nav.no/alene-med-barn");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
