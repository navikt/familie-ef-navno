import React, { useEffect, useState } from 'react';
import { client, hentSideQuery } from '../../utils/sanity';
import { Helmet } from 'react-helmet';
import Temameny from '../../components/Temameny';
import Informasjonspanel from '../../components/Informasjonspanel';
import Tilpasningsboks from '../../components/Tilpasningsboks';
import NavFrontendSpinner from 'nav-frontend-spinner';
import checkboxData from '../../utils/checkboxData';
import { Alert } from '../../components/Alert';
import { lagAnkerLinkID } from '../../utils/utils';

const Barnetilsynstonad = () => {
    const [side, setSide] = useState<any>({});
    const [filter, setFilter] = useState<boolean[]>([]);
    const relevantCheckboxData = checkboxData.barnetilsynsstonad;
    const [className, setClassName] = useState('sticky');
    const sideID = 2;
    const visSisteLenker = true;

    let sideMenuHeight = document.getElementById("sticky_barnetilsynsstonad")?.clientHeight;
    let vinduHoyde = window.innerHeight;

    let diff = sideMenuHeight && vinduHoyde - sideMenuHeight < 0 ? vinduHoyde - sideMenuHeight : 0;

    useEffect(() => {
        setClassName(sideMenuHeight ? (sideMenuHeight >= vinduHoyde ? '' : 'sticky') : 'sticky');
        client
            .fetch(hentSideQuery, { type: 'side', side_id: sideID })
            .then((res: any) => {
                setSide(res);
                setFilter(new Array(relevantCheckboxData.map((obj: any) => obj.texts.length)
                    .reduce((a: number, b: number) => a + b))
                    .fill(false));
            });
            //eslint-disable-next-line
    }, [relevantCheckboxData]);

    const handleFilterChange = (filterStatus: boolean[]) => {
        setFilter(filterStatus);
    };

    const handleOpen = (open: boolean) => {
        if (open) {
            scrollTop();
        }
    }

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const søkKnapp = {
        tekst: "Søk stønad til barnetilsyn",
        url: "https://www.nav.no/soknader/nb/person/familie/enslig-mor-eller-far#NAV150002"
    }

    if (side.artikler !== undefined) {
        return (
            <div className="side">
                <Helmet>
                    <title>{side.hovedtittel}</title>
                </Helmet>
                <div className="banner">
                    <h1>Stønad til barnetilsyn for enslig mor eller far i arbeid</h1>
                </div>
                <div className="breadcrumb">
                    <p className="breadcrumb-link">
                        <a href="https://www.nav.no/no/person">Forside</a>  /  <a href="https://www.nav.no/no/person/familie/enslig-mor-eller-far">Alene med barn </a>
                    </p>
                </div>
                <div className="sideinnhold">
                    <div className="sideinfo">
                            <div 
                                id={'sticky_barnetilsynsstonad'} 
                                className={className}
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
                                    const ankerLinkID = lagAnkerLinkID(artikkel);
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

                        const ankerLinkID = lagAnkerLinkID(artikkel);

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

export default Barnetilsynstonad;