import React, { useEffect, useState, useRef } from 'react';
import { client, hentSideQuery } from '../../utils/sanity';
import { Helmet } from 'react-helmet';
import Temameny from '../../components/Temameny';
import { Sidetittel, Normaltekst } from 'nav-frontend-typografi';
import Informasjonspanel from '../../components/Informasjonspanel';
import Filtreringsboks from '../../components/Filtreringsboks';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Tilpasningsboks from '../../components/Tilpasningsboks';
import { Knapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router-dom';

import  checkboxData from '../../utils/checkboxData';

const BlockContent = require('@sanity/block-content-to-react');

const Barnetilsynstonad = () => {
    const [side, setSide] = useState<any>({});
    const [filter, setFilter] = useState<boolean[]>([]);
    const history = useHistory();
    const artikkelRef = useRef<any[]>([]);
    const relevantCheckboxData = checkboxData.barnetilsynsstonad;
    useEffect(() => {
        client
            .fetch(hentSideQuery, { type: 'side' , side_id: 2})
            .then((res: any) => {
                setSide(res);
                setFilter(new Array(relevantCheckboxData[0].texts.length).fill(false));
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
    
    const BlockRenderer = (props: any) => {
        const { style = 'normal' } = props.node;
              
        if (/^h\d/.test(style)) {
            const level = style.replace(/[^\d]/g, '');
            return React.createElement(
                style,
                { className: `heading-${level}` },
                props.children
            );
        }
              
        if (style === 'blockquote') {
            return <blockquote>- {props.children}</blockquote>;
        }
              
        // Fall back to default handling
        return BlockContent.defaultSerializers.types.block(props);
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
                <p className="breadcrumb">Link/link</p>
                <div className="overgangsstonad">
                    <div className="sideinfo">
                        <div className="sticky">
                            <Tilpasningsboks 
                            filterStatus={filter}
                            checkboxData={relevantCheckboxData}
                            handleChange={handleFilterChange}
                            />
                            <Temameny 
                                temaer={side.artikler.map((artikkel:any) => artikkel.tittel_i_panel)}
                                scrollTil={scrollTilArtikkel}
                            />
                        </div>
                    </div>
                    <div className="hovedinfo">
                        <div className="sideAlertStripe">
                            <AlertStripeAdvarsel>
                                Vi opplever stor pågang! Innsendingen kan ta noe lengre tid.
                            </AlertStripeAdvarsel>
                        </div>
                        <Sidetittel>
                            Stønad til barnetilsyn for enslig mor eller far i arbeid
                        </Sidetittel>
                        {side?.artikler?.map((artikkel: any, index: number) => (
                            <div ref={ (el: any) => artikkelRef.current[index] = el} key={index}>
                                <Informasjonspanel tittel={artikkel.tittel_i_panel} >
                                    {artikkel?.avsnitt !== undefined ? artikkel?.avsnitt.map((avsnitt: any, index: number) => (
                                        filterCheck(avsnitt) ?
                                            <div className="typo-normal" key={index}>
                                                <BlockContent
                                                blocks={avsnitt.avsnitt_innhold}
                                                serializers={{ types: { block: BlockRenderer } }}
                                                />
                                                {avsnitt.knapp !== undefined ? avsnitt.knapp.map((knapp: any) => (
                                                    <Knapp onClick={() => history.push(knapp.lenke)}>{knapp.tekst}</Knapp>
                                                )) : null}
                                            </div> 
                                        : null
                                    )) : null}
                                </Informasjonspanel>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }   
    return (
        <NavFrontendSpinner></NavFrontendSpinner>
    );
}

export default Barnetilsynstonad;