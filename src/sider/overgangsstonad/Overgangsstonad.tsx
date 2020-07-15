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
    const [sideOpen, setSideOpen] = useState<boolean>(false);
    const sideID = 1;
    const visSisteLenker = true;
    let sideMenuHeight = document.getElementById("sticky_overgangsstonad")?.clientHeight;
    let vinduHoyde = window.innerHeight;

    useEffect(() => {
        client
            .fetch(hentSideQuery, { type: 'side', side_id: sideID })
            .then((res: any) => {
                setSide(res);
                setFilter(new Array(relevantCheckboxData.map((obj: any) => obj.texts.length)
                    .reduce((a: number, b: number) => a + b))
                    .fill(false));
            })
    }, [relevantCheckboxData]);

    const handleFilterChange = (filterStatus: boolean[]) => {
        setFilter(filterStatus);
    };

    const handleOpen = (open: boolean) => {
        setSideOpen(open);

        if (open) {
            scrollTop();
        }
    }

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (side.artikler !== undefined) {
        console.log("høyde1", sideMenuHeight)
        return (
            <div className="side">
                <Helmet>
                    <title>{side.hovedtittel}</title>
                </Helmet>
                <div className="banner">
                    <h1>Overgangsstønad til enslig mor eller far</h1>
                </div>
                <div className="breadcrumb">
                    <p className="breadcrumb-link">
                        <a href="https://www.nav.no/no/person">Forside</a>  /  <a href="https://www.nav.no/no/person/familie/enslig-mor-eller-far">Alene med barn </a>
                    </p>
                </div>
                <div className="sideinnhold">
                    <div className="sideinfo">
                        <div
                            className={sideMenuHeight ? (sideMenuHeight >= vinduHoyde ? '' : (sideOpen ? '' : 'sticky')): 'sticky'}
                            id='sticky_overgangsstonad'
                        >
                            {relevantCheckboxData.length ?
                                <Tilpasningsboks
                                    filterStatus={filter}
                                    checkboxData={relevantCheckboxData}
                                    handleChange={handleFilterChange}
                                    handleOpen={handleOpen}
                                /> :
                                null}
                            <Temameny
                                temaer={side.artikler.map((artikkel: any) => ({ tittel: artikkel.tittel_i_liste, id: artikkel._id }))}
                                visSisteLenker={visSisteLenker}
                            />
                        </div>
                    </div>
                    <div className="hovedinfo">
                        {side.alertstripe?.alertstripe_aktiv ?
                            <div className="sideAlertStripe" id='alertstripe'>
                                <Alert alertstripe={side.alertstripe} topp={true} />
                            </div> :
                            null}
                        {side?.artikler?.map((artikkel: any) => (
                            <Informasjonspanel
                                key={artikkel._id}
                                tittel={artikkel.tittel_i_panel}
                                bilde={artikkel.bilde}
                                alttekst={artikkel.alttekst}
                                id={artikkel._id}
                                side={sideID}
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

export default Overgangsstonad; 