import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Innholdstittel } from 'nav-frontend-typografi';

interface Props {
    tittel: string,
}

const Informasjonspanel: React.FC<Props> = (props) => {
    return (
        <Panel className="informasjonspanel">
            <p className="informasjonspanel-ikon"></p>
            <Innholdstittel className="center-text" >{props.tittel}</Innholdstittel>
            {props.children}
        </Panel>
    );
}

export default Informasjonspanel; 