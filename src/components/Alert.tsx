import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { BlockContent } from '../utils/sanity';
import { HashLink } from 'react-router-hash-link';
import { lagAvsnittAnkerLinkID } from '../utils/utils';

interface Props {
    alertstripe?: {
        alertstripe_aktiv?: boolean,
        alertstripe_info?: boolean,
        alertstripe_advarsel?: boolean,
        alertstripe_ikon?: boolean,
        alertstripe_innhold?: any,
    }
    topp: boolean, 
}

const serializers = {
    marks: {
        internalLink: (props: any) => {
            const avsnitt = props.mark?.referert_avsnitt;

            const avsnittID = lagAvsnittAnkerLinkID(avsnitt);

            return <HashLink
                to={'#' + avsnittID}
                smooth={true}
                className="lenke"
            >
                {props.children}
            </HashLink>
        },
        link: (props: any) => {
            const { blank, href } = props.mark;
            return blank ?
                <a href={href} target="_blank" rel="noopener noreferrer">{props.children}</a>
                : <a href={href}>{props.children}</a>;

        }
    }
}

export const Alert: React.FC<Props> = ({ topp, alertstripe }) => {
    const style = (alertstripe?.alertstripe_ikon) ? (topp ? "alertstripe" : "alertstripe alertstripe-avsnitt") : (topp ? "alertstripe alertstripe-utenIkon" : "alertstripe alertstripe-avsnitt alertstripe-utenIkon")
    if (alertstripe?.alertstripe_aktiv) {
        return (
            <AlertStripe
                type={alertstripe.alertstripe_info ? "info" : "advarsel"}
                className={style}
            >
                <BlockContent
                    blocks={alertstripe.alertstripe_innhold}
                    serializers={serializers}
                />
            </AlertStripe>
        );
    }
    else {
        return null;
    }
}