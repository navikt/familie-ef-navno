import React, { useState } from 'react';
import { Input, Label, Select } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import AlertStripe from 'nav-frontend-alertstriper';
import { Element } from 'nav-frontend-typografi';

const options = [
    { value: 1, name: 1 },
    { value: 2, name: 2 },
    { value: 3, name: 3 },
    { value: 4, name: 4 },
    { value: 5, name: 5 },
    { value: 6, name: 6 },
    { value: 7, name: 7 },
    { value: 8, name: 8 },
    { value: 9, name: 9 },
    { value: 10, name: 10 },
];

const KalkulatorBarnetilsyn = () => {
    const [sum, setSum] = useState<number>(0);
    const [antBarn, setAntBarn] = useState<number>();
    const [utgifterBarnepass, setUtgifterBarnepass] = useState<number>();
    const [kontaktstotte, setKontantstotte] = useState<number>(0);
    const [feil, setFeil] = useState<boolean | string>(false);
    const [feilAntBarn, setFeilAntBarn] = useState<boolean | string>(false);

    const [visResultat, setVisResultat] = useState<boolean>(false);

    const beregn = () => {
        if (utgifterBarnepass && antBarn) {
            setFeil(false);
            setFeilAntBarn(false);
            let stotte = Math.round((utgifterBarnepass - kontaktstotte) * 0.64);
            if (antBarn === 1 && stotte >= 4053) {
                setSum(4053);
            }
            else if (antBarn === 2 && stotte >= 5289) {
                setSum(5289);
            }
            else if (antBarn >= 3 && stotte >= 5993) {
                setSum(5993);
            }
            else {
                setSum(stotte > 0 ? stotte : 0);
            }
            setVisResultat(true);
            return;
        }

        if(utgifterBarnepass === 0){
            setSum(0);
            setVisResultat(true);
            return;
        }

        !utgifterBarnepass ? setFeil("Fyll inn utgifter for barnepass") : setFeil(false);
        utgifterBarnepass === 0 ? setSum(0) : 
        !antBarn ? setFeilAntBarn("Velg antall barn") : setFeilAntBarn(false);
        setVisResultat(false);
    };

    const handleChange = (event: any) => {
        setAntBarn(parseInt(event.target.value))
    }

    return (
        <div className="kalkulator">
            <Select
                label="Antall barn du har utgifter til barnepass for"
                bredde="s"
                className="input-select"
                onChange={event => handleChange(event)}
                feil={feilAntBarn}
            >
                <option value="">Velg</option>
                {options.map((o: any, index: number) => (
                    <option value={o.value} key={index}>{o.name}</option>
                ))}
            </Select>
            <div className="input-med-label">
                <Element className="input-label" >Utgifter barnepass, ikke inkludert kostpenger</Element>
                <div className="input-kroner">
                    <Input
                        id="barnetilsyn-kalkulator-input1"
                        bredde="S"
                        value={utgifterBarnepass}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={(event: any) => !isNaN(event.target.value) ? setUtgifterBarnepass(parseInt(event.target.value)) : null}
                        feil={feil}
                    />
                    <Label htmlFor="overgangsstonad-kalkulator-input1">kroner</Label>
                </div>
            </div>
            <div className="input-med-label">
                <Element className="input-label" >Kontantstøtte per måned (hvis du får)</Element>
                <div className="input-kroner">
                    <Input
                        id="barnetilsyn-kalkulator-input2"
                        bredde="S"
                        value={kontaktstotte}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={(event: any) => !isNaN(event.target.value) ? setKontantstotte(event.target.value) : null}
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