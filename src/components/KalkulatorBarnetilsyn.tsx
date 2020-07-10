import React, { useState, useEffect } from 'react';
import { Input, Label, Select } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import AlertStripe from 'nav-frontend-alertstriper';
import { client } from '../utils/sanity';
import { Element } from 'nav-frontend-typografi';

const options = [
    {value: 1, name: 1},
    {value: 2, name: 2},
    {value: 3, name: 3},
    {value: 4, name: 4},
    {value: 5, name: 5},
    {value: 6, name: 6},
    {value: 7, name: 7},
    {value: 8, name: 8},
    {value: 9, name: 9},
    {value: 10, name: 10},
];

const KalkulatorBarnetilsyn = () => {
    const [sum, setSum] = useState<number>(0);
    const [grunnbelop, setGrunnbelop] = useState<number>(0);
    const [antBarn, setAntBarn] = useState<number | undefined>();
    const [utgifterBarnepass, setUtgifterBarnepass] = useState<number | undefined>();
    const [kontaktstotte, setKontantstotte] = useState<number | undefined>();
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
        if (utgifterBarnepass !== undefined && antBarn !== undefined) {
            setFeil(false);
            let stotte = Math.round(utgifterBarnepass*0.64); 
            console.log("stotte", stotte);
            if(antBarn === 1 && stotte >= 4053){
                setSum(4053);
            }
            else if (antBarn === 2 && stotte >= 5289){
                setSum(5289);
            }
            else if (antBarn >= 3 && stotte >= 5993){
                setSum(5993);
            }
            else{
                setSum(stotte);
            }
            setVisResultat(true);
        }
        else {
            setFeil(true);
            setVisResultat(false);
        }
    };

    const handleChange = (event: any) => {
        setAntBarn(event.target.value)
    }

    return (
        <div className="kalkulator">
            <Select label="Antall barn du har utgifter til barnepass for" bredde="s" className="input-select">
                <option value="">Velg</option>
                {options.map((o: any, index: number) => (
                    <option value={o.value} onChange={event => handleChange(event)} key={index}>{o.name}</option>
                ))}
            </Select>
            <div className="input-med-label">
                <Element className="input-label" >Utgifter barnepass, ikke inkludert kostpenger</Element>
                <div className="input-kroner">
                    <Input
                        id="overgangsstonad-kalkulator-input1"
                        bredde="S"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={(event: any) => setUtgifterBarnepass(event.target.value)}
                        feil={feil}
                    />
                    <Label htmlFor="overgangsstonad-kalkulator-input1">kroner</Label>
                </div>
            </div>
            <div className="input-med-label">
                <Element className="input-label" >Kontantstøtte per måned (hvis du får)</Element>
                <div className="input-kroner">
                    <Input
                        id="overgangsstonad-kalkulator-input1"
                        bredde="S"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={(event: any) => setKontantstotte(event.target.value)}
                    />
                    <Label htmlFor="overgangsstonad-kalkulator-input1">kroner</Label>
                </div>
            </div>
            <Knapp className="kalkulator-knapp" onClick={beregn}>Beregn stønad til barnetilsyn</Knapp>
            {visResultat ?
                <AlertStripe type="info" className="alertstripe-utenIkon alertstripe-avsnitt">
                    Du får ca <strong>{sum} kr</strong> i stønad til barnetilsyn per måned.
                    <br />
                    <br />
                    Når vi har behandlet søknaden din om stønad til barnetilsyn, 
                    vil du få vite hva du får utbetalt.
            </AlertStripe>
                : null}
        </div>
    );
}

export default KalkulatorBarnetilsyn; 