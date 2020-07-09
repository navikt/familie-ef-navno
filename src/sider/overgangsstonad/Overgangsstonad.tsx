import React, { useEffect, useState } from 'react';
import { client, hentSideQuery } from '../../utils/sanity';
import { Helmet } from 'react-helmet';
import Temameny from '../../components/Temameny';
import Informasjonspanel from '../../components/Informasjonspanel';
import Tilpasningsboks from '../../components/Tilpasningsboks';
import NavFrontendSpinner from 'nav-frontend-spinner';
import checkboxData from '../../utils/checkboxData';
import { Alert } from '../../components/Alert';

const Overgangsstonad = () => {
    const [side, setSide] = useState<any>({});
    const [filter, setFilter] = useState<boolean[]>([]);
    const relevantCheckboxData = checkboxData.overgangsstonad;

    useEffect(() => {
        client
            .fetch(hentSideQuery, { type: 'side', side_id: 1 })
            .then((res: any) => {
                setSide(res);
                setFilter(new Array(relevantCheckboxData.map((obj: any) => obj.texts.length)
                    .reduce((a: number, b: number) => a + b))
                    .fill(false));
            })
    }, []);

    const handleFilterChange = (filterStatus: boolean[]) => {
        setFilter(filterStatus);
    };

    const filterCheck = (avsnitt: any) => {
        return true;
    }

    const test = [
        {value: 'filter_gravid', name: 'Jeg er gravid'},
        {value: 'filtrer_under_1', name: 'Under 1 år'}
    ];

    if (side.artikler !== undefined) {
        return (
            <div className="side">
                {console.log(filter)}
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
                        {side.alertstripe ?
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
                                side={1}
                                avsnitt={artikkel?.avsnitt}
                                filterCheck={filterCheck}
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

export default Overgangsstonad; 