import React, { useEffect, useState } from 'react';
import { client, hentSideQuery, BlockContent } from '../../utils/sanity';
import Informasjonspanel from '../../components/Informasjonspanel';
import { Sidetittel } from 'nav-frontend-typografi';
import Tilpasningsboks from '../../components/Tilpasningsboks';
import { Helmet } from 'react-helmet';

function Overgangsstonad() {
    const [side, setSide] = useState<any>({});
    useEffect(() => {
        client
            .fetch(hentSideQuery, { type: 'side' , side_id: 1})
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

    if (side !== undefined) {
        return (
            
            <div className="overgangsstonad">
                <Helmet>
                    <title>Overgangsstønad</title>
                </Helmet>

                <div className="banner">
                    <Sidetittel>Overgangsstønad for enslig mor og far</Sidetittel>
                </div>
                <div className="sideinfo">
                    <Tilpasningsboks />
                </div>
                <div className="hovedinfo">
                    {side?.artikler?.map((a: any) => (
                        <Informasjonspanel tittel={a.tittel_i_panel}>
                            {a?.avsnitt !== undefined ? a?.avsnitt.map((avsnitt: any) => (
                                <div className="typo-normal">
                                    <BlockContent
                                    blocks={avsnitt.avsnitt_innhold}
                                    serializers={{ types: { block: BlockRenderer } }}
                                />
                                </div>
                                
                            )) : null}

                        </Informasjonspanel>
                            ))}
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