import React, { useEffect, useState } from 'react';
import { client, hentSideQuery, BlockContent } from '../../utils/sanity';
import Informasjonspanel from '../../components/Informasjonspanel';
import Tilpasningsboks from '../../components/Tilpasningsboks';
import { Helmet } from 'react-helmet';
import { Knapp } from 'nav-frontend-knapper';
import AlertStripe, { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import Filtreringsboks from '../../components/Filtreringsboks';
import checkboxData from '../../utils/checkboxData';
import { Link } from "react-scroll";
import Lenke from 'nav-frontend-lenker';
import { Alert } from '../../components/Alert';
import { useHistory } from 'react-router-dom';
const PortableText = require('@sanity/block-content-to-react');

const serializers = {
    marks: {
        internalLink: (props: any) => {
            console.log("ref", props.mark?.reference?._ref)
            return <Link
                to={props.mark?.reference?._ref}
                spy={true}
                smooth={true}
                className="lenke"
            >
                {props.children}
            </Link>
        },
        link: (props: any) => {
            const { blank, href } = props.mark;
            return blank ?
                <a href={href} target="_blank" rel="noopener" >{props.children}</a>
                : <a href={href}>{props.children}</a>;

        }
    }
}



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
                <p className="breadcrumb"><a>Forside</a> / <a>Alene med barn </a></p>
                <div className="overgangsstonad">
                    <div className="sideinfo">
                        <div className="sticky">
                            <Tilpasningsboks />
                            <Filtreringsboks checkboxData={checkboxData.overgangsstonad} />
                        </div>
                    </div>
                    <div className="hovedinfo">
                        <div className="sideAlertStripe" id='alertstripe'>
                            <Alert alertstripe={side.alertstripe} />
                        </div>
                        {side?.artikler?.map((a: any) => (
                            <Informasjonspanel tittel={a.tittel_i_panel} bilde={a.bilde} alttekst={a.alttekst} id={a._id} avsnitt={a?.avsnitt} knapp={a?.knapp} />
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