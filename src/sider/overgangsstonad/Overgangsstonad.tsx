import React, { useEffect, useState } from 'react';
import { client, hentSideQuery } from '../../utils/sanity';
import Informasjonspanel from '../../components/Informasjonspanel';
import Tilpasningsboks from '../../components/Tilpasningsboks';
import { Helmet } from 'react-helmet';
import Filtreringsboks from '../../components/Filtreringsboks';
import checkboxData from '../../utils/checkboxData';
import { Alert } from '../../components/Alert';

function Overgangsstonad() {
    const [side, setSide] = useState<any>({});

    useEffect(() => {
        client
            .fetch(hentSideQuery, { type: 'side', side_id: 1 })
            .then((res: any) => {
                setSide(res);
                console.log("test", res);
            })
    }, []);

    if (side.artikler !== undefined) {
        return (
            <div className="side">
                <Helmet>
                    <title>Overgangsstønad</title>
                </Helmet>

                <div className="banner">
                    <h1>Overgangsstønad for enslig mor og far</h1>
                </div>
                <p className="breadcrumb"><a href="#">Forside</a> / <a href="#">Alene med barn </a></p>
                <div className="overgangsstonad">
                    <div className="sideinfo">
                        <div className="sticky">
                            <Tilpasningsboks />
                            <Filtreringsboks checkboxData={checkboxData.overgangsstonad} />
                        </div>
                    </div>
                    <div className="hovedinfo">
                        <div className="sideAlertStripe" id='alertstripe'>
                            <Alert alertstripe={side.alertstripe} topp={true}/>
                        </div>
                        {side?.artikler?.map((a: any) => (
                            <Informasjonspanel
                                key={a._id}
                                tittel={a.tittel_i_panel}
                                bilde={a.bilde}
                                alttekst={a.alttekst}
                                id={a._id}
                                avsnitt={a?.avsnitt}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <p>Ikke lastet</p>
        );
    }
}

export default Overgangsstonad; 