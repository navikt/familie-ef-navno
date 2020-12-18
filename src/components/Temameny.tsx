import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import ExternalLink from '../utils/symbols/ExternalLink';
import { HashLink } from 'react-router-hash-link';
import LenkeKnapp from "./Lenkeknapp";

interface Props {
  temaer: [{
    tittel: string,
    id: string,
  }];
  visSisteLenker: boolean;
  søkKnapp?: {
    tekst: string;
    url: string;
  }
}

const Temameny: React.FC<Props> = (props) => {
  return (
    <Panel className="temameny">
      <Undertittel tag="h4">Temaer</Undertittel>
      {props.temaer.map((tema, index) => {
        return (
        <div key={index} className='temameny-lenker'>
          <HashLink
            to={"#" + tema.id}
            smooth={true}
          >
            {tema.tittel}
          </HashLink>
        </div>
      )})
      }
      {props.visSisteLenker ?
       <React.Fragment>
          <a
          href={'https://lovdata.no/nav/folketrygdloven/kap15'}
          >
            Hva sier loven?
        <span>&nbsp;&nbsp;</span>
        <ExternalLink />
          </a>
          <a
          href={'https://www.nav.no/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter'}
          className="temameny-lenker"
          >
            Klagerettigheter
            <ExternalLink />
            <span>&nbsp;&nbsp;</span>
          </a>
       </React.Fragment>
          : null}
      {props.søkKnapp && <LenkeKnapp className="tilpasningsknapp søk-stønad" tekst={props.søkKnapp.tekst} url={props.søkKnapp.url}/>}
    </Panel >
  );
}

export default Temameny;