import React, { useEffect, useState } from 'react';
import { client } from '../../utils/sanity';
import { Helmet } from 'react-helmet';
import Temameny from '../../components/Temameny';
import { Sidetittel } from 'nav-frontend-typografi';

const Barnetilsynstonad = () => {
    const temaer = ['Kort om overgangsstønad','Hvem kan få?','Barnas alder',
                  'Arbeidssituasjonen din','Hvor lenge kan du få?','Hvor mye kan du få?',
                  'Når utbetales pengene?', 'Du må melde fra om endringer', 'Du kan miste retten til stønad', 
                  'Slik søker du', 'Hva sier loven?', 'klagerettigheter',];
    
                  

    return (
        <div className={"barnetilsynsstønad"}>
            <Helmet>
                <title>Barnetilsynsstønad</title>
            </Helmet>
            <Sidetittel>
                Stønad til barnetilsyn for enslig mor eller far i arbeid
            </Sidetittel>
            <Temameny temaer={temaer}/>
        </div>
    );
}

export default Barnetilsynstonad;