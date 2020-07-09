import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Link } from 'react-scroll';
import { BlockContent } from '../utils/sanity';
import { Alert } from './Alert';

interface Props {
    tittel: string;
    bilde?: string;
    alttekst?: string;
    id?: string;
    avsnitt?: any;
    filterCheck: (avsnitt: any) => boolean;
}

const serializers = {
    types: {
        tallreferanse: (props: any) => {
            return null;
        }
    },
    marks: {
        internalLink: (props: any) => {
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
                <a href={href} target="_blank" rel="noopener noreferrer" >{props.children}</a>
                : <a href={href}>{props.children}</a>;

        }
    }
}

const Informasjonspanel: React.FC<Props> = (props) => {
    return (
        <Panel className="informasjonspanel" id={props.id}>
            <div className="informasjonspanel-ikon">
                <img src={props.bilde} alt={props.alttekst} />
            </div>
            <Innholdstittel className="center-text" >{props.tittel}</Innholdstittel>
            {props.avsnitt !== undefined ? props.avsnitt.map((avsnitt: any) => (
                props.filterCheck(avsnitt) ?
                    <div key={avsnitt._id}>
                        <BlockContent
                            className="typo-normal"
                            blocks={avsnitt.avsnitt_innhold}
                            serializers={serializers}
                        />
                        {avsnitt.knapp?.tekst !== undefined ?
                            <a href={avsnitt.knapp.lenke} className="knapp lenkeknapp">{avsnitt.knapp.tekst}</a>
                            : null}
                        {avsnitt.alertstripe !== undefined ?
                            <Alert alertstripe={avsnitt.alertstripe} />
                            : null}
                    </div>
                    : null
            )) : null}
            {props.children}
        </Panel>
    );
}

export default Informasjonspanel; 