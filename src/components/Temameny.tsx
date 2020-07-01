import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

interface Props {
    temaer: string[];
  }

const Temameny: React.FC<Props> = (props) => {
    return (
        <Panel className={"temapanel"} style={{width: "250px"}}>
          <Undertittel>Temaer</Undertittel>
          {props.temaer.map((tema, index) => (
            <Normaltekst className={"temalinje"} key={index}>
              <a href={'temameny'}>
                {tema}
              </a>
            </Normaltekst>
          ))}
        </Panel>
    );
}

export default Temameny;