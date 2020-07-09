import React, { Children } from 'react';
import Panel from 'nav-frontend-paneler';
import { Innholdstittel, Systemtittel } from 'nav-frontend-typografi';
import { Link } from 'react-scroll';
import { BlockContent, hentTall, client } from '../utils/sanity';
import { Alert } from './Alert';
import KalkulatorOvergangsstonad from './KalkulatorOvergangsstonad';
import KalkulatorBarnetilsyn from './KalkulatorBarnetilsyn';

interface Props {
    tittel: string,
    bilde?: string,
    alttekst?: string,
    id?: string,
    avsnitt?: any,
}

const serializers = {
    types: {
        tallreferanse: (props: any) => {
            console.log(props)
            return <p>Test</p>; 
        }, 
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
            {props.avsnitt !== undefined ? props.avsnitt.map((a: any) => (
                <div key={a._id}>
                    <BlockContent
                        className="typo-normal block-styling"
                        blocks={a.avsnitt_innhold}
                        serializers={serializers}
                    />
                    {a.knapp?.tekst !== undefined ?
                        <a href={a.knapp.lenke} className="knapp lenkeknapp">{a.knapp.tekst}</a>
                        : null}
                    {a.alertstripe !== undefined ?
                        <Alert alertstripe={a.alertstripe} topp={false}/>
                        : null}
                    {a.kalkulator ? 
                        <KalkulatorBarnetilsyn />
                        : null
                    }
                </div>
            )) : null}
            {props.children}
        </Panel>
    );
}

export default Informasjonspanel; 