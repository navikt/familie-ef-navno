import React, { useEffect, useState } from 'react';
import { client, hentLandingssideQuery } from '../../utils/sanity';
import { Element, Systemtittel } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import kvinne from '../../assets/kvinne.svg';
import barn from '../../assets/barn.svg';
import sjekkliste from '../../assets/sjekkliste.svg';
import tablet from '../../assets/tablet.svg';

const Landingsside = () => {
    const [side, setSide] = useState<any>({});

    useEffect(() => {
        client
            .fetch(hentLandingssideQuery, { type: 'landingsside', side_id: 1 })
            .then((res: any) => {
                setSide(res);
            })
    }, []);

    if (side.hovedkort_1) return (
        <div className="landingsside">
                <div className="banner-landingsside">
                    <div className="banner-innhold">
                    <h1>Alene med barn</h1>
                    <div className="ingress">
                    Når du er alene med barn, finnes det ulike støtteordninger du kan ha rett til.
                    </div>
                    </div>
                </div>

                <div className="innhold-landingsside">

                    <div className="hovedbokser">
                        <a className="boks-link" href={side?.hovedkort_1?.boks_lenke} target="_blank" rel="noopener noreferrer">
                        <div className="hovedboks">
                        <div className="hovedboks__header">
                            <div className="img-wrapper">
                            <img alt="kvinne" className="kvinneikon" src={kvinne} />
                            <img alt="barn" className="barneikon" src={barn} />
                            </div>
                        </div>

                        <div className="hovedboks__innhold">
                            <Element className="boks-overskrift">{side?.hovedkort_1?.boks_overskrift}</Element>
                            <div className="hovedboks-tekst">
                                {side?.hovedkort_1?.boks_innhold}
                            </div>
                        </div>
                        </div>
                        </a>

                        <a className="boks-link" href={side?.hovedkort_2?.boks_lenke} target="_blank" rel="noopener noreferrer">
                            <div className="hovedboks">
                            <div className="hovedboks__header">
                                <div className="img-wrapper">
                                <img alt="kvinne" className="sjekklisteikon" src={sjekkliste} />
                                </div>
                            </div>
                            <div className="hovedboks__innhold">
                                <Element className="boks-overskrift">{side?.hovedkort_2?.boks_overskrift}</Element>
                                <div className="hovedboks-tekst">
                                    {side?.hovedkort_2?.boks_innhold}
                                </div>
                            </div>
                            </div>
                        </a>

                        <a className="boks-link" href={side?.hovedkort_3?.boks_lenke} target="_blank" rel="noopener noreferrer">
                            <div className="hovedboks">
                            <div className="hovedboks__header">
                                <div className="img-wrapper">
                                <img alt="kvinne" className="tabletikon" src={tablet} />
                                </div>
                            </div>
                            <div className="hovedboks__innhold">
                                <Element className="boks-overskrift">{side?.hovedkort_3?.boks_overskrift}</Element>
                                <div className="hovedboks-tekst">
                                    {side?.hovedkort_3?.boks_innhold}
                                </div>
                            </div>
                            </div>
                        </a>

                    </div>

                    <div className="aktuelle-stønader">
                        <Systemtittel className="stønad-tittel">Aktuelle stønader</Systemtittel>
                        <div className="stønadsbokser">
                            {side?.aktuelle_stonader?.map((stønad: any) => 
                            <a className="boks-link" href={stønad.boks_lenke} target="_blank" rel="noopener noreferrer">
                                <div className="boks" key={stønad._key}>
                                    <Element className="boks-overskrift">{stønad.boks_overskrift}</Element>
                                    <div className="boks-innhold">
                                        {stønad.boks_innhold}
                                    </div>
                                </div>
                            </a>)}
                        </div>
                    </div>
                </div>
        </div>
    )
    return (
        <NavFrontendSpinner />
    );

}

export default Landingsside;
