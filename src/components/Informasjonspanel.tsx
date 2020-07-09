import React, { Children } from 'react';
import Panel from 'nav-frontend-paneler';
import { Innholdstittel, Systemtittel } from 'nav-frontend-typografi';
import { Link } from 'react-scroll';
import { BlockContent, hentTall, client } from '../utils/sanity';
import { Alert } from './Alert';
import KalkulatorOvergangsstonad from './KalkulatorOvergangsstonad';
import KalkulatorBarnetilsyn from './KalkulatorBarnetilsyn';

interface Props {
    tittel: string;
    bilde?: string;
    alttekst?: string;
    id?: string;
    avsnitt?: any;
    side?: number;
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

        },
        tallreferanse: (props: any) => {
            const { reference } = props.mark;
            console.log("props", reference)
            return <p>{reference._ref}</p>;
        },
    }
}

const hentTallTilTekst = (ref: any) => {
    console.log("metode kjører")
    client
        .fetch(hentTall, { tall_id: ref })
        .then((res: any) => {
            console.log("REEEEES", res)
            return res.tallverdi
        })
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
                            <Alert alertstripe={avsnitt.alertstripe} topp={false}/>
                            : null}
                        {avsnitt.kalkulator ?
                        (props.side === 1 ? <KalkulatorOvergangsstonad /> : <KalkulatorBarnetilsyn />)
                            : null
                        }
                    </div>
                    : null
            )) : null}
            {props.children}
        </Panel>
    );
}

export default Informasjonspanel; 