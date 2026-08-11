const express = require('express');
const app = express();
const port = 8080;

// Referer er ofte undefined pga. Referrer-Policy, personvernfilter i nettleser e.l.
// Sec-Fetch-Site/-Mode/-Dest og user-agent gir ekstra kontekst selv da:
// - Sec-Fetch-Site "none" betyr direkte navigasjon (skrevet inn URL, bokmerke, lenke i e-post/PDF/QR-kode)
// - Sec-Fetch-Site "cross-site"/"same-site"/"same-origin" viser hvor forespørselen kom fra selv uten referer
const utledDebugInfo = (request) => {
    const headers = request.headers || {};
    return JSON.stringify({
        referer: headers.referer,
        secFetchSite: headers['sec-fetch-site'],
        secFetchMode: headers['sec-fetch-mode'],
        secFetchDest: headers['sec-fetch-dest'],
        userAgent: headers['user-agent'],
        xForwardedFor: headers['x-forwarded-for'],
    });
};

app.get('/status', (req, res) => {
    res.status(200).end();
});

app.use("/familie/alene-med-barn/overgangsstonad", (req, res) => {
    console.log(`Redirecter fra /familie/alene-med-barn/overgangsstonad. Debug: ${utledDebugInfo(req)}`);
    res.redirect("https://www.nav.no/overgangsstonad-enslig");
});

app.use("/familie/alene-med-barn/barnetilsyn", (req, res) => {
    console.log(`Redirecter fra /familie/alene-med-barn/barnetilsyn. Debug: ${utledDebugInfo(req)}`);
    res.redirect("https://www.nav.no/barnetilsyn-enslig");
});

app.use("/familie/alene-med-barn/skolepenger", (req, res) => {
    console.log(`Redirecter fra /familie/alene-med-barn/skolepenger. Debug: ${utledDebugInfo(req)}`);
    res.redirect("https://www.nav.no/skolepenger-enslig");
});

app.use("/familie/alene-med-barn/tilleggsstonader", (req, res) => {
    console.log(`Redirecter fra /familie/alene-med-barn/tilleggsstonader. Debug: ${utledDebugInfo(req)}`);
    res.redirect("https://www.nav.no/tilleggsstonader-enslig");
});

app.use("/familie/alene-med-barn/hva-naa", (req, res) => {
    console.log(`Redirecter fra /familie/alene-med-barn/hva-naa. Debug: ${utledDebugInfo(req)}`);
    res.redirect("https://www.nav.no/alene-med-barn");
});

app.use("/familie/alene-med-barn/", (req, res) => {
    console.log(`Redirecter fra /familie/alene-med-barn/. Debug: ${utledDebugInfo(req)}`);
    res.redirect("https://www.nav.no/alene-med-barn");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
