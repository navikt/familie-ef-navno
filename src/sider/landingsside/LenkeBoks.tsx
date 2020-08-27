import React from 'react';
import { Element } from 'nav-frontend-typografi';

interface ILenkeBoks {
    overskrift: string;
    innhold?: boolean;
  }

const LenkeBoks: React.FC<ILenkeBoks>  = ({overskrift, innhold}) => {
    return (<div className="boks">
    <Element className="boks-overskrift">{overskrift}</Element>
    <div className="boks-innhold">
        {innhold}
    </div>
</div>)
}

export default LenkeBoks;
