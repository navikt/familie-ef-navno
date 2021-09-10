import React, {useState, useEffect} from 'react';
import {Input } from 'nav-frontend-skjema';
import {Knapp} from 'nav-frontend-knapper';
import {client} from '../utils/sanity';

interface Props {
    test?: string,
}

const KalkulatorOvergangsstonad: React.FC<Props> = (props) => {
    const [sum, setSum] = useState<number>(0);
    const [grunnbelop, setGrunnbelop] = useState<number>(0);
    const [inntekt, setInntekt] = useState<number>();
    const [feil, setFeil] = useState<boolean | string>(false);
    const [visResultat, setVisResultat] = useState<boolean>(false);

    useEffect(() => {
        client
            .fetch('*[_type==$type && navn==$navn][0]', {type: 'tall', navn: 'grunnbelop'})
            .then((res: any) => {
                setGrunnbelop(res.tallverdi)
            })
    }, []);

    const beregn = () => {
        let uredusertOS = Math.round((grunnbelop * 2.25) / 12);
        let halvtGrunnbelop = grunnbelop / 2;

        if (inntekt) {
            let arsinntekt = Math.floor(inntekt * 12 / 1000) * 1000;

            if (arsinntekt > 48750) {
                return 0;
            }

            setFeil(false);
            if (arsinntekt <= halvtGrunnbelop) {
                setSum(uredusertOS);
            } else {

                let tall = Math.round(0.45 * (arsinntekt - halvtGrunnbelop));
                let fratrekk = Math.round(tall / 12);
                setSum(uredusertOS - fratrekk > 0 ? uredusertOS - fratrekk : 0);
            }
            setVisResultat(true);
        } else if (!inntekt) {
            setFeil("Fyll inn inntekt (må være tall)")
            setVisResultat(false);
        } else {
            setFeil("Fyll inn inntekt (må være tall)");
            setVisResultat(false);
        }
    };

    return (
        <div>
            <div className="input-kroner">
                <Input
                    label="Månedlig arbeidsinntekt før skatt"
                    bredde="S"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="kr"
                    value={inntekt}
                    onChange={(event: any) => !isNaN(event.target.value) ? setInntekt(event.target.value) : null}
                    feil={feil}
                />
            </div>
            <Knapp className="kalkulator-knapp" onClick={beregn}>Beregn overgangsstønad</Knapp>
            {visResultat &&
            <div className="alertstripe alertstripe--info">
                <div className="typo-normal alertstripe-avsnitt">
                    <span className="mb-1rem"> Beregnet overgangsstønad blir <strong>{sum} kr</strong> før skatt i måneden.</span>
                    Husk at hvis du får andre stønader kan dette påvirke hvor mye du får i overgangsstønad.
                    Når vi har behandlet søknaden din om overgangsstønad,
                    vil du få vite hva du får utbetalt.
                </div>
            </div>}
        </div>
    );
}

export default KalkulatorOvergangsstonad; 