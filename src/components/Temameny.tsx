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
          {props.temaer.map(tema => (
            <Normaltekst className={"temalinje"}>
              <a href={'#'}>
                {tema}
              </a>
            </Normaltekst>
          ))}
        </Panel>
    );
}

export default Temameny;