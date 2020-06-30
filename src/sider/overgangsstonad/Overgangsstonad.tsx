import React, { useEffect, useState } from 'react';
import { client } from '../../utils/sanity';
import Informasjonspanel from '../../components/Informasjonspanel';
import { Sidetittel } from 'nav-frontend-typografi';
import Tilpasningsboks from '../../components/Tilpasningsboks';

const BlockContent = require('@sanity/block-content-to-react');

function Overgangsstonad() {
    const [artikler, setArtikler] = useState<any>();
    useEffect(() => {
        client
            .fetch('*[_type == $type][1]', { type: 'avsnitt' })
            .then((res: any) => {
                setArtikler(res);
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

    if (artikler !== undefined) {
        return (
            <div className="overgangsstonad">
                <div className="banner">
                    <Sidetittel>Overgangsstønad for enslig mor og far</Sidetittel>
                </div>
                <div className="sideinfo">
                    <Tilpasningsboks />
                </div>
                <div className="hovedinfo">
                    <Informasjonspanel tittel={artikler.tittel}>
                        <BlockContent
                            className="typo-normal"
                            blocks={artikler.avsnitt_innhold}
                            serializers={{ types: { block: BlockRenderer } }}
                        />
                    </Informasjonspanel>
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