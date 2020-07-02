import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

interface Props {
  temaer: string[];
}

const Temameny: React.FC<Props> = (props) => {
  return (
    <Panel>
      <Undertittel>Temaer</Undertittel>
      {props.temaer.map(tema => (
        <a href={'temameny'} className={"temalinje"}>
          <Normaltekst>
            {tema}
          </Normaltekst>
        </a>
      ))
      }
    </Panel >
  );
}

export default Temameny;