import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { BlockContent } from '../utils/sanity';
import { Link } from 'react-scroll';
import Lenke from 'nav-frontend-lenker';

interface Props {
    alertstripe?: {
        alertstripe_aktiv?: boolean,
        alertstripe_info?: boolean,
        alertstripe_advarsel?: boolean,
        alertstripe_ikon?: boolean,
        alertstripe_innhold?: any,
    }
}

const serializers = {
    marks: {
        internalLink: (props: any) => {
            console.log("ref", props.mark?.reference?._ref)

            return <Link
                to={props.mark?.reference?._ref}
                spy={true}
                smooth={true}
            >
                {props.children}
            </Link>
        },
        link: (props: any) => {
            const { blank, href } = props.mark;
            return blank ?
                <a href={href} target="_blank" rel="noopener">{props.children}</a>
                : <a href={href}>{props.children}</a>;

        }
    }
}

export const Alert: React.FC<Props> = ({ alertstripe }) => {
    if (alertstripe?.alertstripe_aktiv) {
        console.log("alert", alertstripe)
        return (
            <AlertStripe
                type={alertstripe.alertstripe_info ? "info" : "advarsel"}
                className={alertstripe.alertstripe_ikon ? "alertstripe" : "alertstripe alertstripe-utenIkon"}
            >
                <BlockContent
                    blocks={alertstripe.alertstripe_innhold}
                    serializers={serializers}
                />
            </AlertStripe>
        );
    }
    else {
        console.log("ikke noe", alertstripe)
        return null;
    }
}