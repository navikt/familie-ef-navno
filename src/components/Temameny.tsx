import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';
import { Link } from 'react-scroll';

interface Props {
  temaer: [{
    tittel: string,
    id: string,
  }];
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
    </Panel >
  );
}

export default Temameny;