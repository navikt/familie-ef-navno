import React, { useEffect, useState } from 'react';
import { client, hentSideQuery } from '../../utils/sanity';
import { Helmet } from 'react-helmet';
import Temameny from '../../components/Temameny';
import Informasjonspanel from '../../components/Informasjonspanel';
import Tilpasningsboks from '../../components/Tilpasningsboks';
import NavFrontendSpinner from 'nav-frontend-spinner';
import checkboxData from '../../utils/checkboxData';
import { Alert } from '../../components/Alert';
import {lagArtikkelAnkerLinkID } from '../../utils/utils';

const Alenemedbarn = () => {
    const [side, setSide] = useState<any>({});
    const [filter, setFilter] = useState<boolean[]>([]);
    const relevantCheckboxData = checkboxData.alenemedbarn;
    const [sideOpen, setSideOpen] = useState<boolean>(false);
    const sideID = 5;
    const visSisteLenker = false;
    useEffect(() => {
        client
            .fetch(hentSideQuery, { type: 'side', side_id: sideID })
            .then((res: any) => {
                setSide(res);
                setFilter(new Array(relevantCheckboxData.map((obj: any) => obj.texts.length)
                    .reduce((a: number, b: number) => a + b))
                    .fill(false));
            });
    }, [relevantCheckboxData]);

    const handleFilterChange = (filterStatus: boolean[]) => {
        setFilter(filterStatus);
    };

    const handleOpen = (open: boolean) => {
        setSideOpen(open);
        
        if(open){
            scrollTop();
        }
    };

    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    if (side.artikler !== undefined) {
        return (
            <div className="side">
                <Helmet>
                    <title>{side.hovedtittel}</title>
                </Helmet>
                <div className="banner">
                    <h1>Alene med barn - hva nå?</h1>
                </div>
                <nav className="breadcrumb">
                    <p className="breadcrumb-link">
                        <a href="https://www.nav.no/no/person">Forside</a>  /  <a href="https://www.nav.no/familie/alene-med-barn">Alene med barn </a>
                    </p>
                </nav>
                <div className="sideinnhold" role="main">
                    <div className="sideinfo">
                        <div 
                            className={sideOpen ? '' : 'sticky'} 
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
                                temaer={side.artikler
                                    .map((artikkel: any) => {
                                        const ankerLinkID = lagArtikkelAnkerLinkID(artikkel);
                                        return ({ tittel: artikkel.tittel_i_liste, id: ankerLinkID })})
                                    .filter((v: {tittel: string, id: string}) => v.tittel)
                                }
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

export default Alenemedbarn;