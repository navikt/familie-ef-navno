import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Link } from 'react-scroll';
import { BlockContent } from '../utils/sanity';
import { Alert } from './Alert';
import KalkulatorOvergangsstonad from './KalkulatorOvergangsstonad';
import KalkulatorBarnetilsyn from './KalkulatorBarnetilsyn';
import Tabell from './Tabell';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import EtikettBase from 'nav-frontend-etiketter';

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

enum Kategori {
    Alder = "alder",
    Situasjon = "situasjon",
    HvorforAlene = "hvorfor_alene",
    HvorMyeOmsorg = "hvor_mye_omsorg",
    Arbeidssituasjon = "arbeidssituasjon"
}

const serializers = {
    types: {
        tabell: (props: any) => {
            return null;
        },
        etikett: (props: any) => {
            const node = props.node;
            return (<EtikettBase
                className="etikett-sanity"
                mini
                type="info">{node.etikett}</EtikettBase>
            );
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
            const { tall } = props.mark;
            return tall.tallverdi
        },
        datoreferanse: (props: any) => {
            const { dato } = props.mark;
            return dato.dato;
        },
        filreferanse: (props: any) => {
            const { blank, pdf } = props.mark;
            console.log(props.mark);
            if (pdf) {
            return blank ?
                <a href={pdf.url} target="_blank" rel="noopener noreferrer" >{props.children}</a>
                : <a href={pdf.url}>{props.children}</a>;
            }
            return null;
        },
    }
}

const Informasjonspanel: React.FC<Props> = (props) => {

    const filterCheck = (avsnitt: any) => {
        if (avsnitt.filtrer_blir_staende) return true;
        if (props.filterStatus.every(filter => filter === false)) return true;

        if (props.sideID === 1) {
            const filterStatusAlder = props.filterStatus.slice(0, 4);
            const filterStatusSituasjon = props.filterStatus.slice(4, 11);

            if (avsnitt?.kategori === Kategori.Alder && filterStatusAlder.every(filter => filter === false)) return true;
            if (avsnitt?.kategori === Kategori.Situasjon && filterStatusSituasjon.every(filter => filter === false)) return true;

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
        if (props.sideID === 5) {
            const filterStatusHvorforAlene = props.filterStatus.slice(0, 3);
            const filterStatusHvorMyeOmsorg = props.filterStatus.slice(3, 5);
            const filterStatusArbeidssituasjon = props.filterStatus.slice(5, 9);

            const gjortValgIHvorforAlene = filterStatusHvorforAlene.some(filter => filter === true);
            const gjortValgIHvorMyeOmsorg = filterStatusHvorMyeOmsorg.some(filter => filter === true);
            const gjortValgIArbeidssituasjon = filterStatusArbeidssituasjon.some(filter => filter === true);

            const ingenFilterMatchIHvorforAlene = !((avsnitt.filtrer_samvlivsbrudd && props.filterStatus[0]) || (avsnitt.filtrer_fra_fodsel && props.filterStatus[1]) || (avsnitt.filtrer_dodsfall && props.filterStatus[2]));
            const ingenFilterMatchIHvorMyeOmsorg = !((avsnitt.filtrer_mer_enn_60 && props.filterStatus[3]) || (avsnitt.filtrer_mindre_enn_60 && props.filterStatus[4]));
            const ingenFilterMatchIArbeidssituasjon = !((avsnitt.filtrer_i_arbeid && props.filterStatus[5]) || (avsnitt.filtrer_utdanning && props.filterStatus[6]) || (avsnitt.filtrer_arbeidssoker && props.filterStatus[7]) ||  (avsnitt.filter_ikke_arbeid && props.filterStatus[8]));

            if (avsnitt?.kategori?.includes(Kategori.HvorforAlene)) {
                if (gjortValgIHvorforAlene && ingenFilterMatchIHvorforAlene) {
                    return false
                }
            }

            if (avsnitt?.kategori?.includes(Kategori.HvorMyeOmsorg)) {
                if (gjortValgIHvorMyeOmsorg && ingenFilterMatchIHvorMyeOmsorg) {
                    return false
                }
            }

            if (avsnitt?.kategori?.includes(Kategori.Arbeidssituasjon)) {
                if (gjortValgIArbeidssituasjon && ingenFilterMatchIArbeidssituasjon) {
                    return false
                }
            }

            return true;
        }

        return false;
    }

    return (
        <Panel className="informasjonspanel" id={props.id}>
            <div className="informasjonspanel-ikon">
                <img src={props.bilde} alt={props.alttekst} />
            </div>
            <h1>{props.tittel}</h1>
            {props.avsnitt !== undefined && props.avsnitt.map((avsnitt: any, index: number) => (
                filterCheck(avsnitt) &&
                    <div key={avsnitt._id} id={avsnitt._id}>
                        {avsnitt.avsnitt_innhold &&
                            <BlockContent
                                blocks={avsnitt.avsnitt_innhold}
                                serializers={serializers}
                            />
                        }
                        {avsnitt._type === "tabell" &&
                            <Tabell rows={avsnitt?.tabelldata?.rows} />
                        }
                        {avsnitt.knapp?.tekst !== undefined &&
                            <a href={avsnitt.knapp.lenke} target="_blank" rel="noopener noreferrer" className={avsnitt.knapp.bla ? "lenkeknapp knapp knapp--hoved" : "lenkeknapp knapp"}>{avsnitt.knapp.tekst}</a>
                        }
                        {avsnitt.alertstripe !== undefined &&
                            <Alert alertstripe={avsnitt.alertstripe} topp={false} />
                        }
                        {avsnitt.kalkulator ?
                            props.sideID === 1 ? <KalkulatorOvergangsstonad key={avsnitt._id + index} />
                                : props.sideID === 2 ? <KalkulatorBarnetilsyn key={avsnitt._id + index} /> 
                                    : null
                            : null
                        }
                        {avsnitt.dokument &&
                            <Ekspanderbartpanel tittel="Dette må du dokumentere">
                                <BlockContent
                                    blocks={avsnitt.dokument}
                                    serializers={serializers}
                                />
                            </Ekspanderbartpanel>
                        }
                    </div>
            ))}
            {props.children}
        </Panel>
    );
}

export default Informasjonspanel; 