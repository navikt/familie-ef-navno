import React, { useEffect, useState, useRef } from 'react';
import { client, hentSideQuery } from '../../utils/sanity';
import { Helmet } from 'react-helmet';
import Temameny from '../../components/Temameny';
import Informasjonspanel from '../../components/Informasjonspanel';
import Tilpasningsboks from '../../components/Tilpasningsboks';
import NavFrontendSpinner from 'nav-frontend-spinner';
import  checkboxData from '../../utils/checkboxData';
import { Alert } from '../../components/Alert';
import { checkPropTypes } from 'prop-types';

const Barnetilsynstonad = () => {
    const [side, setSide] = useState<any>({});
    const [filter, setFilter] = useState<boolean[]>([]);
    const artikkelRef = useRef<any[]>([]);
    const relevantCheckboxData = checkboxData.skolepengerstønad;
    useEffect(() => {
        client
            .fetch(hentSideQuery, { type: 'side', side_id: 3 })
            .then((res: any) => {
                setSide(res);
                if (relevantCheckboxData.length) {
                    setFilter(new Array(relevantCheckboxData.map((obj: any) => obj.texts.length)
                    .reduce((a: number, b: number) => a+b))
                    .fill(false));
                }
            })
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
        return true;
    }

    if (side.artikler !== undefined) {
        return (
            <div className="side">
                {console.log(filter)}
                <Helmet>
                    <title>Skolepengerstønad</title>
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
                            temaer={side.artikler.map((artikkel: any) => artikkel.tittel_i_panel)}
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