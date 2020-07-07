import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Innholdstittel } from 'nav-frontend-typografi';

interface Props {
    tittel: string,
    bilde?: string,
    alttekst?: string, 
    id?: string,
}

const Informasjonspanel: React.FC<Props> = (props) => {
    return (
        <Panel className="informasjonspanel" id={props.id}>
            <div className="informasjonspanel-ikon">
                <img src={props.bilde} alt={props.alttekst}/>
            </div>
            <Innholdstittel className="center-text" >{props.tittel}</Innholdstittel>
            {props.children}
        </Panel>
    );
}

export default Informasjonspanel; 