import React, { useEffect, useState, useRef } from 'react';
import { client, hentSideQuery } from '../../utils/sanity';
import { Helmet } from 'react-helmet';
import Temameny from '../../components/Temameny';
import Informasjonspanel from '../../components/Informasjonspanel';
import Tilpasningsboks from '../../components/Tilpasningsboks';
import NavFrontendSpinner from 'nav-frontend-spinner';
import checkboxData from '../../utils/checkboxData';
import { Alert } from '../../components/Alert';

const Skolepengerstonad = () => {
    const [side, setSide] = useState<any>({});
    const [filter, setFilter] = useState<boolean[]>([]);
    const relevantCheckboxData = checkboxData.skolepengerstønad;
    const sideID = 3;
    useEffect(() => {
        client
            .fetch(hentSideQuery, { type: 'side', side_id: sideID })
            .then((res: any) => {
                setSide(res);
                if (relevantCheckboxData.length) {
                    setFilter(new Array(relevantCheckboxData.map((obj: any) => obj.texts.length)
                        .reduce((a: number, b: number) => a + b))
                        .fill(false));
                }
            })
    }, []);

    const handleFilterChange = (filterStatus: boolean[]) => {
        setFilter(filterStatus);
    };

    if (side.artikler !== undefined) {
        return (
            <div className="side">
                <Helmet>
                    <title>Skolepengerstønad</title>
                </Helmet>
                <div className="banner">
                    <h1>Stønad til skolepenger for enslig mor eller far som tar utdanning</h1>
                </div>
                <div className="breadcrumb">
                    <p className="breadcrumb-link">
                        <a href="https://www.nav.no/no/person">Forside</a>  /  <a href="https://www.nav.no/no/person/familie/enslig-mor-eller-far">Alene med barn </a>
                    </p>
                </div>
                <div className="sideinnhold">
                    <div className="sideinfo">
                        <div className="sticky">
                            {relevantCheckboxData.length ?
                                <Tilpasningsboks
                                    filterStatus={filter}
                                    checkboxData={relevantCheckboxData}
                                    handleChange={handleFilterChange}
                                /> :
                                null}
                            <Temameny
                                temaer={side.artikler.map((artikkel: any) => ({ tittel: artikkel.tittel_i_liste, id: artikkel._id }))}
                            />
                        </div>
                    </div>
                    <div className="hovedinfo">
                        {side.alertstripe?.alertstripe_aktiv ?
                            <div className="sideAlertStripe" id='alertstripe'>
                                <Alert alertstripe={side.alertstripe} topp={true} />
                            </div> :
                            null}
                        {side?.artikler?.map((artikkel: any, index: number) => (
                            <Informasjonspanel
                                key={artikkel._id}
                                tittel={artikkel.tittel_i_panel}
                                bilde={artikkel.bilde}
                                alttekst={artikkel.alttekst}
                                id={artikkel._id}
                                avsnitt={artikkel?.avsnitt}
                                filterStatus={filter}
                                sideID={sideID}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    return (
        <NavFrontendSpinner />
    );
}

export default Skolepengerstonad;