import React from 'react';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';

interface Props {
    tittel: any,
    ingress: any,
}

const Card: React.FC<Props> = ({ tittel, ingress, children }) => {
    return (
        <div className="infocard">
            <Systemtittel>{tittel}</Systemtittel>
            <Normaltekst>{ingress}</Normaltekst>

            {children}
        </div>
    );
}

export default Card; 