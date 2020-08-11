import React, { useEffect, useState } from 'react';
import { client, hentLandingssideQuery } from '../../utils/sanity';
import { Helmet } from 'react-helmet';
import Temameny from '../../components/Temameny';
import Informasjonspanel from '../../components/Informasjonspanel';
import Tilpasningsboks from '../../components/Tilpasningsboks';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import checkboxData from '../../utils/checkboxData';
import { Alert } from '../../components/Alert';
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

    console.log("Landing", side);

    return (
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

                        <div className="hovedboks">
                        <div className="hovedboks__header">
                            <div className="img-wrapper">
                            <img alt="kvinne" className="kvinneikon" src={kvinne} />
                            <img alt="barn" className="barneikon" src={barn} />
                            </div>
                        </div>
                        <div className="hovedboks__innhold">
                            <Element className="boks-overskrift">Overskrift</Element>
                            <div className="hovedboks-tekst">
                                tekst tekst yo
                            </div>
                        </div>
                        </div>

                        <div className="hovedboks">
                        <div className="hovedboks__header">
                            <div className="img-wrapper">
                            <img alt="kvinne" className="sjekklisteikon" src={sjekkliste} />
                            </div>
                        </div>
                        <div className="hovedboks__innhold">
                            <Element className="boks-overskrift">Overskrift</Element>
                            <div className="hovedboks-tekst">
                                tekst tekst yo
                            </div>
                        </div>
                        </div>

                        <div className="hovedboks">
                        <div className="hovedboks__header">
                            <div className="img-wrapper">
                            <img alt="kvinne" className="tabletikon" src={tablet} />
                            </div>
                        </div>
                        <div className="hovedboks__innhold">
                            <Element className="boks-overskrift">Overskrift</Element>
                            <div className="hovedboks-tekst">
                                tekst tekst yo
                            </div>
                        </div>
                        </div>

                    </div>

                    <div className="aktuelle-stønader">
                        <Systemtittel className="stønad-tittel">Aktuelle stønader</Systemtittel>
                        <div className="stønadsbokser">
                            {side?.aktuelle_stonader?.map((stønad: any) => 
                            <div className="boks">
                                <Element className="boks-overskrift">{stønad.boks_overskrift}</Element>
                                <div className="boks-innhold">
                                    {stønad.boks_innhold}
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
        </div>
    )

}

export default Landingsside;