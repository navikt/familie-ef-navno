import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';

interface Props {

  }

const Tilpasningsboks: React.FC<Props> = () => {
    return (
        <div style={{width: "250px"}}>
        <Panel className="tilpasningspanel">
            <div>
             <Normaltekst >
                    Fortell oss litt om situasjonen din, 
                    så viser vi bare den informasjonen som er 
                    relevant for deg.
                </Normaltekst>
            </div>
                
                <Knapp className="tilpasningsknapp">
                    Tilpass informasjon <br/> til meg
                </Knapp>
        </Panel>
        </div>
    );
}

export default Tilpasningsboks;