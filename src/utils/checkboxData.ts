const checkboxData = {
    overgangsstonad:  [
            {
                groupName: 'Hvor gammelt er det yngste barnet ditt?',
                texts: ['Jeg er gravid', 'Under 1 år', 'Mellom 1 og 8 år', 'Over 8 år']
            },
            {
                groupName: 'Hva er situasjonen din?',
                texts: ['Jeg er i arbeid', 'Jeg tar eller skal ta utdanning', 'Jeg er arbeidssøker', 
                        'Jeg etablerer egen virksomhet', 'Jeg er syk eller har sykt barn',
                        'Jeg har et barn som trenger særlig tilsyn', 'Jeg mangler barnepass'],
            }
        ],
    barnetilsynsstonad:  [
            {
                groupName: 'Hva er situasjonen din?',
                texts: ['Jeg er i arbeid', 'Jeg etablerer egen virksomhet', 'Jeg er syk'],
            },
        ],
    tilleggsstønad: [
            {
                groupName: 'Hva er situasjonen din?',
                texts: ['Jeg tar utdanning', 'Jeg er arbeidssøker']
            },
        ],
    skolepengerstønad: [

        ],
    alenemedbarn: [
            {
                groupName: 'Hvorfor er du alene med barn?',
                texts: ['På grunn av samlivsbrudd', 'Alene med barn fra fødsel', 'På grunn av dødsfall'],
            },
            {
                groupName: 'Hvor mye av den daglige omsorgen for barn har du?',
                texts: ['Jeg har 60 prosent eller mer av den daglige omsorgen', 
                        'Jeg har mindre enn 60% av den daglige omsorgen'],
            },
            {
                groupName: 'Hva er arbeidssituasjonen din?',
                texts: ['Jeg er i arbeid', 'Jeg tar eller skal ta utdanning', 'Jeg er arbeidssøker', 
                        'Jeg er ikke i arbeid, utdanning eller søker jobb'],
            },
        ],
}

export default checkboxData; 