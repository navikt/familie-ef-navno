import React, { useEffect, useState } from 'react';
import { client, hentSideQuery, BlockContent } from '../../utils/sanity';
import Informasjonspanel from '../../components/Informasjonspanel';
import Tilpasningsboks from '../../components/Tilpasningsboks';
import { Helmet } from 'react-helmet';
import { Knapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router-dom';
import Temameny from '../../components/Temameny';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Filtreringsboks from '../../components/Filtreringsboks';

import  checkboxData from '../../utils/checkboxData';

function Overgangsstonad() {
    const [side, setSide] = useState<any>({});
    const history = useHistory();
    useEffect(() => {
        client
            .fetch(hentSideQuery, { type: 'side', side_id: 1 })
            .then((res: any) => {
                setSide(res);
                console.log("test", res);
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
                    <title>Overgangsstønad</title>
                </Helmet>

                <div className="banner">
                    <h1>Overgangsstønad for enslig mor og far</h1>
                </div>
                <p className="breadcrumb">Link/link</p>
                <div className="overgangsstonad">
                    <div className="sideinfo">
                        <div className="sticky">
                            <Tilpasningsboks />
                            <Filtreringsboks checkboxData={checkboxData.overgangsstonad}/>
                        </div>
                    </div>
                    <div className="hovedinfo">
                        <div className="sideAlertStripe">
                            <AlertStripeAdvarsel>Vi opplever stor pågang! Innsendingen kan ta noe lengre tid.</AlertStripeAdvarsel>
                        </div>
                        {side?.artikler?.map((a: any) => (
                            <Informasjonspanel tittel={a.tittel_i_panel} bilde={a.bilde} alttekst={a.alttekst}>
                                {a?.avsnitt !== undefined ? a?.avsnitt.map((avsnitt: any) => (
                                    <div className="typo-normal">
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
    else {
        return (
            <p>Ikke lastet</p>
        );
    }
}

export default Overgangsstonad; 