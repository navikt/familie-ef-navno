import React, { useEffect, useState, useRef } from 'react';
import { client, hentSideQuery } from '../../utils/sanity';
import { Helmet } from 'react-helmet';
import Temameny from '../../components/Temameny';
import { Sidetittel } from 'nav-frontend-typografi';
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
    const history = useHistory();
    useEffect(() => {
        client
            .fetch(hentSideQuery, { type: 'side' , side_id: 2})
            .then((res: any) => {
                setSide(res);
            })
    }, []);
              
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


    if (side.artikler !== undefined) {
        return (
            <div className="side">
                <Helmet>
                    <title>Barnetilsynsstønad</title>
                </Helmet>
                <Sidetittel>
                    Stønad til barnetilsyn for enslig mor eller far i arbeid
                </Sidetittel>
                <p className="breadcrumb">Link/link</p>
                <div className="barnetilsynsstonad">
                    <div className="sideinfo">
                        <div className="sticky">
                            <Tilpasningsboks />
                            <Filtreringsboks checkboxData={checkboxData.barnetilsynsstonad}/>
                            <Temameny temaer={side.artikler.map((artikkel:any) => artikkel.tittel_i_panel)}/>
                        </div>
                    </div>
                    <div className="hovedinfo">
                        <div className="sideAlertStripe">
                            <AlertStripeAdvarsel>
                                Vi opplever stor pågang! Innsendingen kan ta noe lengre tid.
                            </AlertStripeAdvarsel>
                        </div>
                        {side?.artikler?.map((artikkel: any, index: number) => (
                            <Informasjonspanel tittel={artikkel.tittel_i_panel} key={index}>
                                {artikkel?.avsnitt !== undefined ? artikkel?.avsnitt.map((avsnitt: any, index: number) => (
                                    <div className="typo-normal" key={index}>
                                        <BlockContent
                                        blocks={avsnitt.avsnitt_innhold}
                                        serializers={{ types: { block: BlockRenderer } }}
                                        />
                                        {avsnitt.knapp !== undefined ? avsnitt.knapp.map((knapp: any) => (
                                            <Knapp onClick={() => history.push(knapp.lenke)}>{knapp.tekst}</Knapp>
                                        )) : null}
                                    </div>
                                )) : null}
                            </Informasjonspanel>
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