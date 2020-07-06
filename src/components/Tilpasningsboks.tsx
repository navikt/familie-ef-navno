import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Knapp } from 'nav-frontend-knapper';
import { Element, Normaltekst } from 'nav-frontend-typografi';

interface Props {

}

const Tilpasningsboks: React.FC<Props> = () => {
    return (
        <Panel className="tilpasningspanel">
            <Normaltekst >
                Fortell oss litt om situasjonen din,
                så viser vi bare den informasjonen som er
                relevant for deg.
            </Normaltekst>
            <Knapp className="tilpasningsknapp">
                <Element>Tilpass informasjon <br /> til meg</Element>
            </Knapp>
        </Panel>
    );
}

export default Tilpasningsboks;