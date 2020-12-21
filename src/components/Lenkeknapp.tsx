import React from "react";


interface LenkeknappProps {
    className?: string;
    tekst: string;
    url: string;
}

const LenkeKnapp: React.FC<LenkeknappProps> = ({className, url, tekst}) => {
    const classNames = `knapp knapp--hoved ${className}`;
    return (
        <a href={url} className={classNames}>{tekst}</a>
    )
}


export default LenkeKnapp;