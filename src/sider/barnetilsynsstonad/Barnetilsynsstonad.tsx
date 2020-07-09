import React, { useEffect, useState, useRef } from 'react';
import { client, hentSideQuery } from '../../utils/sanity';
import { Helmet } from 'react-helmet';
import Temameny from '../../components/Temameny';
import Informasjonspanel from '../../components/Informasjonspanel';
import Tilpasningsboks from '../../components/Tilpasningsboks';
import NavFrontendSpinner from 'nav-frontend-spinner';
import  checkboxData from '../../utils/checkboxData';
import { Alert } from '../../components/Alert';

const Barnetilsynstonad = () => {
    const [side, setSide] = useState<any>({});
    const [filter, setFilter] = useState<boolean[]>([]);
    const artikkelRef = useRef<any[]>([]);
    const relevantCheckboxData = checkboxData.barnetilsynsstonad;
    useEffect(() => {
        client
            .fetch(hentSideQuery, { type: 'side' , side_id: 2})
            .then((res: any) => {
                setSide(res);
                setFilter(new Array(relevantCheckboxData.map((obj: any) => obj.texts.length)
                .reduce((a: number, b: number) => a+b))
                .fill(false));
            });
    }, []);

    const scrollTilRef = ( ref: any) => {
        if ( !ref ) return;
        window.scrollTo({ top: ref.offsetTop, left: 0, behavior: 'smooth' });
    };
    
    const scrollTilArtikkel = (int: number) => {
        setTimeout(() => scrollTilRef(artikkelRef.current[int]), 120);
      };
              
    const handleFilterChange = (filterStatus: boolean[]) => {
        setFilter(filterStatus);
    };

    const filterCheck = (avsnitt :any) => {
        if (avsnitt.filtrer_blir_staende) return true;
        if (filter.every( el => el === false )) return true;
        if (avsnitt.filtrer_i_arbeid && filter[0]) return true;
        if (avsnitt.filtrer_egen_virksomhet && filter[1]) return true;
        if (avsnitt.filtrer_sykdom && filter[2]) return true;
        return false;
    }

    if (side.artikler !== undefined) {
        return (
            <div className="side">
                <Helmet>
                    <title>Barnetilsynsstønad</title>
                </Helmet>
                <div className="banner">
                    <h1>Stønad til barnetilsyn for enslig mor eller far i arbeid</h1>
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
                            temaer={side.artikler.map((artikkel:any) => artikkel.tittel_i_panel)}
                            scrollTil={scrollTilArtikkel}
                            />
                        </div>
                    </div>
                    <div className="hovedinfo">
                        {side.alertstripe ? 
                        <div className="sideAlertStripe" id='alertstripe'>
                            <Alert alertstripe={side.alertstripe} />
                        </div> :
                        null}     
                        {side?.artikler?.map((artikkel: any, index: number) => (
                            <div ref={ (el: any) => artikkelRef.current[index] = el} key={artikkel._id}>
                                <Informasjonspanel
                                    key={artikkel._id}
                                    tittel={artikkel.tittel_i_panel}
                                    bilde={artikkel.bilde}
                                    alttekst={artikkel.alttekst}
                                    id={artikkel._id}
                                    avsnitt={artikkel?.avsnitt}
                                    filterCheck={filterCheck}
                                />
                            </div>
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

export default Barnetilsynstonad;