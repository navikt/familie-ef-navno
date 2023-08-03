# familie-ef-navno

Frontend app for redirect til informasjonssider for enslige forsørgere (overgangsstønad, barnetilsyn, skolepenger, tilleggsstønader)

## Kom i gang med utvikling
* Installere avhengigheter `yarn`
* Starte app lokalt `yarn start`

## Bygg prodversjon av app lokalt
* `yarn run build`
* `yarn run serve`

## Bygg og deploy
Appen bygges via github actions og gir beskjed til nais deploy om å deploye appen til gcp. Ved push og PR sjekkes det at appen bygger. Ved workflow dispatch bygges app og docker image som hostes i dev-gcp. Ved merge mot master bygges app og docker image som hostes i prod-gcp.

## Henvendelser

### For eksterne
Spørsmål knyttet til koden eller prosjektet kan rettes til:

* Viktor Grøndalen Solbeerg, `viktor.grondalen.solberg@nav.no`

### For NAV-ansatte
Interne henvendelser kan sendes via Slack i kanalen #team-familie.