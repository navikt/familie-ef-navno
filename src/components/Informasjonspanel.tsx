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
    filterStatus: boolean[];
    sideID: number;
}

const serializers = {
    types: {
        tallreferanse: () => {
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
            return <p>{reference._ref}</p>;
        },
    }
}

const Informasjonspanel: React.FC<Props> = (props) => {

    const filterCheck = (avsnitt :any) => {
        console.log(avsnitt);
        if (avsnitt.filtrer_blir_staende) return true; 
        if (props.filterStatus.every( el => el === false )) return true;
        if (props.sideID === 1) {
            if (avsnitt.filtrer_gravid && props.filterStatus[0]) return true;
            if (avsnitt.filtrer_under_1 && props.filterStatus[1]) return true;
            if (avsnitt.filtrer_1_til_8 && props.filterStatus[2]) return true;
            if (avsnitt.filtrer_over_8 && props.filterStatus[3]) return true;
            if (avsnitt.filtrer_i_arbeid && props.filterStatus[4]) return true;
            if (avsnitt.filtrer_utdanning && props.filterStatus[5]) return true;
            if (avsnitt.filtrer_arbeidssoker && props.filterStatus[6]) return true;
            if (avsnitt.filtrer_egen_virksomhet && props.filterStatus[7]) return true;
            if (avsnitt.filtrer_sykdom && props.filterStatus[8]) return true;
            if (avsnitt.filtrer_tilsyn && props.filterStatus[9]) return true;
            if (avsnitt.filtrer_barnepass && props.filterStatus[10]) return true;
        }
        if (props.sideID === 2) {
            if (avsnitt.filtrer_i_arbeid && props.filterStatus[0]) return true;
            if (avsnitt.filtrer_egen_virksomhet && props.filterStatus[1]) return true;
            if (avsnitt.filtrer_sykdom && props.filterStatus[2]) return true;
        }
        if (props.sideID === 4) {
            if (avsnitt.filtrer_utdanning && props.filterStatus[0]) return true;
            if (avsnitt.filtrer_arbeidssoker && props.filterStatus[1]) return true;
        }
        return false;
    }
    
    return (
        <Panel className="informasjonspanel" id={props.id}>
            <div className="informasjonspanel-ikon">
                <img src={props.bilde} alt={props.alttekst} />
            </div>
            <Innholdstittel className="center-text" >{props.tittel}</Innholdstittel>
            {props.avsnitt !== undefined ? props.avsnitt.map((avsnitt: any, index: number) => (
                filterCheck(avsnitt) ?
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
                        (props.side === 1 ? <KalkulatorOvergangsstonad key={avsnitt._id + index}/> : <KalkulatorBarnetilsyn key={avsnitt._id + index} />)
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