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
            return <Link
                to={props.mark.reference._ref}
                spy={true}
                smooth={true}
                className="lenke"
            >
                {props.children}
            </Link>
        },
        link: ({ mark }: { mark: any }, { children }: { children: any }) => {
            const { blank, href } = mark
            console.log("hei")
            return blank ?
                <Lenke href={href}>{children}</Lenke> : null

        }
    }
}

export const Alert: React.FC<Props> = ({ alertstripe }) => {
    if (alertstripe?.alertstripe_aktiv) {
        console.log(alertstripe)
        return (
            <AlertStripe
                type={alertstripe.alertstripe_info ? "info" : "advarsel"}
                className={alertstripe.alertstripe_ikon ? "" : "alertstripe-utenIkon"}>
                <BlockContent 
                blocks={alertstripe.alertstripe_innhold}
                />
            </AlertStripe>
        );
    }
    else {
        console.log("ikke noe", alertstripe)
        return null;
    }
}