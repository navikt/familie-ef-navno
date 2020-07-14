import React, { useState, useEffect } from 'react';
import { Input, Label } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import AlertStripe from 'nav-frontend-alertstriper';
import { client } from '../utils/sanity';

interface Props {
    test?: string,
}

const KalkulatorOvergangsstonad: React.FC<Props> = (props) => {
    const [sum, setSum] = useState<number>(0);
    const [grunnbelop, setGrunnbelop] = useState<number>(0);
    const [inntekt, setInntekt] = useState<number>();
    const [feil, setFeil] = useState<boolean|string>(false);
    const [visResultat, setVisResultat] = useState<boolean>(false);

    useEffect(() => {
        client
            .fetch('*[_type==$type && navn==$navn][0]', { type: 'tall', navn: 'grunnbelop' })
            .then((res: any) => {
                setGrunnbelop(res.tallverdi)
            })
    }, []);

    const beregn = () => {
        let uredusertOS = Math.round((grunnbelop*2.25)/12);
        let halvtGrunnbelop = grunnbelop/2;

        if(inntekt && inntekt){
            let arsinntekt = Math.floor(inntekt*12/1000)*1000;
            setFeil(false);
            if(arsinntekt <= halvtGrunnbelop){
                setSum(uredusertOS);
            }
            else{

                let tall = Math.round(0.45*(arsinntekt-halvtGrunnbelop));
                let fratrekk = Math.round(tall/12);
                setSum(uredusertOS-fratrekk > 0 ? uredusertOS-fratrekk : 0);
            }
            setVisResultat(true);
        }
        else if(!inntekt){
            setFeil("Fyll inn inntekt (må være tall)")
            setVisResultat(false);
        }
        else{
            setFeil("Fyll inn inntekt (må være tall)");
            setVisResultat(false);
        }
    };

    return (
        <div>
            <div className="input-kroner">
                <Input
                    id="overgangsstonad-kalkulator-input1"
                    bredde="S"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={inntekt}
                    onChange={(event: any) => !isNaN(event.target.value) ? setInntekt(event.target.value) : null}
                    feil={feil}
                />
                <Label htmlFor="overgangsstonad-kalkulator-input1">kroner</Label>
            </div>
            <Knapp className="kalkulator-knapp" onClick={beregn}>Beregn overgangsstønad</Knapp>
            {visResultat ? 
            <AlertStripe type="info" className="alertstripe-utenIkon alertstripe-avsnitt">
                Beregnet overgangsstønad blir <strong>{sum} kr</strong> før skatt i måneden.
                <br />
                <br />
                Når vi har behandlet søknaden din om overgangsstønad,
                vil du få vite hva du får utbetalt.
            </AlertStripe> 
            : null}
        </div>
    );
}

export default KalkulatorOvergangsstonad; 