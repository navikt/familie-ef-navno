import React, { useEffect, useState } from 'react';
import { client, hentSideQuery } from '../../utils/sanity';
import { Helmet } from 'react-helmet';
import Temameny from '../../components/Temameny';
import Informasjonspanel from '../../components/Informasjonspanel';
import Tilpasningsboks from '../../components/Tilpasningsboks';
import NavFrontendSpinner from 'nav-frontend-spinner';
import checkboxData from '../../utils/checkboxData';
import { logEvent } from '../../utils/amplitude';
import { Alert } from '../../components/Alert';
import { lagArtikkelAnkerLinkID } from '../../utils/utils';

const Overgangsstonad = () => {
    const [side, setSide] = useState<any>({});
    const [filter, setFilter] = useState<boolean[]>([]);
    const relevantCheckboxData = checkboxData.overgangsstonad;
    const [sideOpen, setSideOpen] = useState<boolean>(false);
    const [className, setClassName] = useState('sticky');
    const sideID = 1;
    const visSisteLenker = true;
    let sideMenuHeight = document.getElementById("sticky_overgangsstonad")?.clientHeight;
    let vinduHoyde = window.innerHeight;

    let diff = sideMenuHeight && vinduHoyde - sideMenuHeight < 0 ? vinduHoyde - sideMenuHeight : 0;

    useEffect(() => {
        console.log("Sidevisning overgangsstønad")
        logEvent('sidevisning', {'side': 'test'})
    }, []);

    useEffect(() => {
        setClassName(sideMenuHeight ? (sideMenuHeight >= vinduHoyde ? '' : 'sticky') : 'sticky');
        client
            .fetch(hentSideQuery, { type: 'side', side_id: sideID })
            .then((res: any) => {
                setSide(res);
                setFilter(new Array(relevantCheckboxData.map((obj: any) => obj.texts.length)
                    .reduce((a: number, b: number) => a + b))
                    .fill(false));
            })
        // eslint-disable-next-line
    }, [relevantCheckboxData]);

    const handleFilterChange = (filterStatus: boolean[]) => {
        setFilter(filterStatus);
    };

    const handleOpen = (open: boolean) => {
        setSideOpen(open);
        console.log(sideOpen); // TODO: fjern eller bruk senere for å fjerne warnings

        if (open) {
            scrollTop();
            setClassName('')
        }

        else{
            setClassName(sideMenuHeight ? (sideMenuHeight >= vinduHoyde ? '' : 'sticky') : 'sticky');
        }
    }

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const søkKnapp = {
        tekst: "Søk overgangsstønad",
        url: "https://www.nav.no/familie/alene-med-barn/soknad"
    }

    if (side.artikler !== undefined) {
        return (
            <div className="side">
                <Helmet>
                    <title>{side.hovedtittel}</title>
                </Helmet>
                <div className="banner">
                    <h1>Overgangsstønad til enslig mor eller far</h1>
                </div>
                <nav className="breadcrumb">
                </nav>
                <div className="sideinnhold" role="main">
                    <div className="sideinfo">
                        <div
                            className={className}
                            id='sticky_overgangsstonad'
                            style={{top: diff}}
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
                                temaer={side.artikler.map((artikkel: any) => {
                                    const ankerLinkID = lagArtikkelAnkerLinkID(artikkel);
                                    return ({ tittel: artikkel.tittel_i_liste, id: ankerLinkID })})
                                }
                                visSisteLenker={visSisteLenker}
                                søkKnapp={søkKnapp}
                            />
                        </div>
                    </div>
                    <div className="hovedinfo">
                        {side.alertstripe?.alertstripe_aktiv ?
                            <div className="sideAlertStripe" id='alertstripe'>
                                <Alert alertstripe={side.alertstripe} topp={true} />
                            </div> :
                            null}
                        {side?.artikler?.map((artikkel: any) => {

                            const ankerLinkID = lagArtikkelAnkerLinkID(artikkel);

                            return (<Informasjonspanel
                                key={artikkel._id}
                                tittel={artikkel.tittel_i_panel}
                                bilde={artikkel.bilde}
                                alttekst={artikkel.alttekst}
                                id={ankerLinkID}
                                side={sideID}
                                avsnitt={artikkel?.avsnitt}
                                filterStatus={filter}
                                handleFilterChange={handleFilterChange}
                                sideID={sideID}
                            />
                        )})}
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