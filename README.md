# familie-ef-navno

Node app for redirect til informasjonssider for enslige forsørgere (overgangsstønad, barnetilsyn, skolepenger, tilleggsstønader)

## Kom i gang med utvikling
* Installere avhengigheter `yarn`
* Starte Node app lokalt `yarn run serve`

## Bygg og deploy
Appen bygges via github actions og gir beskjed til nais deploy om å deploye appen til gcp. Ved push og PR sjekkes det at appen bygger. Ved workflow dispatch bygges app og docker image som hostes i dev-gcp. Ved merge mot main bygges app og docker image som hostes i prod-gcp.

## Henvendelser

### For eksterne
Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub.

### For NAV-ansatte
Interne henvendelser kan sendes via Slack i kanalen #team-familie.

## Kode generert av GitHub Copilot
Dette repoet bruker GitHub Copilot til å generere kode.