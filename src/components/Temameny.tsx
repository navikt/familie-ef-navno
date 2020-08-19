import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import { Link } from 'react-scroll';
import ExternalLink from '../utils/symbols/ExternalLink';
import { Hovedknapp } from 'nav-frontend-knapper';

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
      <Undertittel>Temaer</Undertittel>
      {props.temaer.map((tema, index) => {
        return (
        <div key={index} className='temameny-lenker'>
          <Link
            hashSpy={true}
            to={tema.id}
            spy={true}
            smooth={true}
          >
            {tema.tittel}
          </Link>
        </div>
      )})
      }
      {props.visSisteLenker ? 
        <div className='temameny-lenker'>
          <a
          href={'https://lovdata.no/nav/folketrygdloven/kap15'}
          >
            Hva sier loven? 
          </a>
          <span>&nbsp;&nbsp;</span>
          <ExternalLink />
        </div> :
        null}
      {props.visSisteLenker ?
        <div className='temameny-lenker'>
          <a 
          href={'https://www.nav.no/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter'}
          >
            Klagerettigheter 
          </a>
          <span>&nbsp;&nbsp;</span>
          <ExternalLink />
        </div> :
        null}
        {props.søkKnapp && <a href={props.søkKnapp.url}><Hovedknapp className="tilpasningsknapp">{props.søkKnapp.tekst}</Hovedknapp></a>}
    </Panel >
  );
}

export default Temameny;