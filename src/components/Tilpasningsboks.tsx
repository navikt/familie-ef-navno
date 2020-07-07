import React, { useState } from 'react';
import Panel from 'nav-frontend-paneler';
import { Knapp } from 'nav-frontend-knapper';
import { Element, Normaltekst } from 'nav-frontend-typografi';

interface Props {

}

const Tilpasningsboks: React.FC<Props> = props => {
    const [showComponent, setShowComponents] = useState(false);
    const handleClick = () => {
        setShowComponents(!showComponent);
    }

    return (
        <Panel className="tilpasningspanel">
            <Normaltekst >
                Fortell oss litt om situasjonen din,
                så viser vi bare den informasjonen som er
                relevant for deg.
            </Normaltekst>
            {showComponent ? 
                props.children
            : null}
            <Knapp 
            className="tilpasningsknapp"
            onClick={handleClick}
            >
                <Element>Tilpass informasjon <br /> til meg</Element>
            </Knapp>
        </Panel>
    );
}

export default Tilpasningsboks;