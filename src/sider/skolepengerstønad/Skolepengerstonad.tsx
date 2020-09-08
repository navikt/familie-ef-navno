import React, { useEffect, useState } from 'react';
import { client, hentSideQuery } from '../../utils/sanity';
import { Helmet } from 'react-helmet';
import Temameny from '../../components/Temameny';
import Informasjonspanel from '../../components/Informasjonspanel';
import Tilpasningsboks from '../../components/Tilpasningsboks';
import NavFrontendSpinner from 'nav-frontend-spinner';
import checkboxData from '../../utils/checkboxData';
import { Alert } from '../../components/Alert';
import { lagArtikkelAnkerLinkID } from '../../utils/utils';

const Skolepengerstonad = () => {
    const [side, setSide] = useState<any>({});
    const [filter, setFilter] = useState<boolean[]>([]);
    const relevantCheckboxData = checkboxData.skolepengerstønad;
    const [sideOpen, setSideOpen] = useState<boolean>(false);
    const sideID = 3;
    const visSisteLenker = true;

    let menuHoyde = 670;
    let vinduHoyde = window.innerHeight;

    let diff = vinduHoyde - menuHoyde < 0 ? vinduHoyde - menuHoyde : 0;

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
    }, [relevantCheckboxData]);

    const handleFilterChange = (filterStatus: boolean[]) => {
        setFilter(filterStatus);
    };

    const handleOpen = (open: boolean) => {
        setSideOpen(open);
        
        if(open){
            scrollTop();
        }
    }

    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const søkKnapp = {
        tekst: "Søk stønad til skolepenger",
        url: "https://www.nav.no/soknader/nb/person/familie/enslig-mor-eller-far#NAV150004"
    }

    if (side.artikler !== undefined) {
        return (
            <div className="side">
                <Helmet>
                    <title>{side.hovedtittel}</title>
                </Helmet>
                <div className="banner">
                    <h1>Stønad til skolepenger for enslig mor eller far som tar utdanning</h1>
                </div>
                <div className="breadcrumb">
                    <p className="breadcrumb-link">
                        <a href="https://www.nav.no/no/person">Forside</a>  /  <a href="https://www.nav.no/familie/alene-med-barn">Alene med barn </a>
                    </p>
                </div>
                <div className="sideinnhold">
                    <div className="sideinfo">
                            <div 
                                className={sideOpen ? '' : 'sticky'}
                                id={'sticky_skolepengerstonad'}
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

export default Skolepengerstonad;