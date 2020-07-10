import React, { useState, useEffect } from 'react';
import { Element } from 'nav-frontend-typografi';
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
    const [inntekt, setInntekt] = useState<number|undefined>();
    const [feil, setFeil] = useState<boolean>(false);
    const [visResultat, setVisResultat] = useState<boolean>(false);

    useEffect(() => {
        client
            .fetch('*[_type==$type && navn==$navn][0]', { type: 'tall', navn: 'grunnbelop' })
            .then((res: any) => {
                setGrunnbelop(res.tallverdi)
            })
    }, []);

    const beregn = () => {
        if(inntekt !== undefined){
            console.log("inntekt", inntekt)
            setFeil(false);
            if(inntekt*12 < grunnbelop/2){
                setSum(Math.round((grunnbelop * 2.25)/12));
            }
            else{
                let halvtGrunnbelop = grunnbelop/2; 
                let tall = Math.round(0.45*(inntekt-halvtGrunnbelop));
                let fratrekk = Math.round(tall/12);
                let uredusertOS = Math.round((grunnbelop * 2.25)/12);
                setSum(uredusertOS-fratrekk);
            }
            setVisResultat(true);
        }
        else{
            setFeil(true);
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
                    onChange={(event: any) => setInntekt(event.target.value)}
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