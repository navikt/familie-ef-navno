import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import { Link } from 'react-scroll';

interface Props {
  temaer: [{
    tittel: string,
    id: string,
  }];
  visSisteLenker: boolean;
}

const Temameny: React.FC<Props> = (props) => {
  return (
    <Panel className="temameny">
      <Undertittel>Temaer</Undertittel>
      {props.temaer.map((tema, index) => (
        <div key={index} className='temameny-lenker'>
          <Link
            to={tema.id}
            spy={true}
            smooth={true}
          >
            {tema.tittel}
          </Link>
        </div>
      ))
      }
      {props.visSisteLenker ? 
        <div className='temameny-lenker'>
          <a
          href={'https://lovdata.no/nav/folketrygdloven/kap15'}
          >
            Hva sier loven?
          </a>
        </div> :
        null}
      {props.visSisteLenker ?
        <div className='temameny-lenker'>
          <a 
          href={'https://www.nav.no/no/nav-og-samfunn/kontakt-nav/klage-ris-og-ros/klagerettigheter'}
          >
            Klagerettigheter
          </a>
        </div> :
        null}
    </Panel >
  );
}

export default Temameny;