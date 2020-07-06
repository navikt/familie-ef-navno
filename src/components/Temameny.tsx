import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';

interface Props {
  temaer: string[];
  scrollTil: (int: number) => void;
}

const Temameny: React.FC<Props> = (props) => {
  return (
    <Panel>
      <Undertittel>Temaer</Undertittel>
      {props.temaer.map( (tema, index) => (
        <div key={index}>
          <button 
          className={'temabutton'}
          onClick={ () => props.scrollTil(index)}
          >
            {tema}
          </button>
        </div>
      ))
      }
    </Panel >
  );
}

export default Temameny;