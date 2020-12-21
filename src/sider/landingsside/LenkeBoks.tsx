import React from 'react';
import { Sidetittel }  from 'nav-frontend-typografi';
import {Link} from "react-router-dom";

interface ILenkeBoks {
    overskrift: string;
    innhold?: boolean;
    lenke: string
}

const LenkeBoks: React.FC<ILenkeBoks> = ({overskrift, lenke, innhold}) => {
    return (
        <Lenke href={lenke}>
            <div className="boks">
                <Sidetittel className="boks-overskrift" tag="h3">{overskrift}</Sidetittel>
                <p className="boks-innhold">
                    {innhold}
                </p>
            </div>
        </Lenke>
    )
}


const eksternLenke = (lenke: string) => {
    return (lenke.includes("https://") || (lenke.includes("http://")));
}

const Lenke: React.FC<{ href: string }> = (props) => {
    if (eksternLenke(props.href)) {
        return (
            <a className="boks-link" href={props.href} rel="noopener noreferrer">
                {props.children}
            </a>
        )
    } else {
        return (
            <Link className="boks-link" to={props.href} rel="noopener noreferrer">
                {props.children}
            </Link>
        )
    }
}


export default LenkeBoks;
