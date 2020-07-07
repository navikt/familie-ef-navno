import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Innholdstittel } from 'nav-frontend-typografi';
import { Link } from 'react-scroll';
import { BlockContent } from '../utils/sanity';
import { Alert } from './Alert';

interface Props {
    tittel: string,
    bilde?: string,
    alttekst?: string,
    id?: string,
    avsnitt?: any,
    knapp?: {
        lenke?: string,
        tekst?: string,
    },
}

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

const Informasjonspanel: React.FC<Props> = (props) => {
    return (
        <Panel className="informasjonspanel" id={props.id}>
            <div className="informasjonspanel-ikon">
                <img src={props.bilde} alt={props.alttekst} />
            </div>
            <Innholdstittel className="center-text" >{props.tittel}</Innholdstittel>
            {props.avsnitt !== undefined ? props.avsnitt.map((avsnitt: any) => (
                <div>
                    <BlockContent
                        className="typo-normal"
                        blocks={avsnitt.avsnitt_innhold}
                        serializers={serializers}
                    />
                    {avsnitt.knapp?.tekst !== undefined ?
                        <a href={avsnitt.knapp.lenke} className="knapp lenkeknapp">{avsnitt.knapp.tekst}</a>
                        : null}
                    <Alert alertstripe={props.avsnitt?.alertstripe} />
                </div>
            )) : null}
            {props.children}
        </Panel>
    );
}

export default Informasjonspanel; 