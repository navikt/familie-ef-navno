import React, {useState} from 'react';
import {Input, Select} from 'nav-frontend-skjema';
import {Knapp} from 'nav-frontend-knapper';

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
    const [kontaktstotte, setKontantstotte] = useState<number>();
    const [feil, setFeil] = useState<boolean | string>(false);
    const [feilAntBarn, setFeilAntBarn] = useState<boolean | string>(false);

    const [visResultat, setVisResultat] = useState<boolean>(false);

    const beregn = () => {
        if (utgifterBarnepass && antBarn) {
            setFeil(false);
            setFeilAntBarn(false);
            let stotte = Math.round((utgifterBarnepass - (kontaktstotte || 0)) * 0.64);
            if (antBarn === 1 && stotte >= 4195) {
                setSum(4195);
            } else if (antBarn === 2 && stotte >= 5474) {
                setSum(5474);
            } else if (antBarn >= 3 && stotte >= 6203) {
                setSum(6203);
            } else {
                setSum(stotte > 0 ? stotte : 0);
            }
            setVisResultat(true);
            return;
        }

        if (utgifterBarnepass === 0) {
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
            <div className="input-kroner">
                <Input
                    label="Utgifter barnepass, ikke inkludert kostpenger"
                    id="barnetilsyn-kalkulator-input1"
                    bredde="S"
                    value={utgifterBarnepass}
                    inputMode="numeric"
                    placeholder="kr"
                    pattern="[0-9]*"
                    onChange={(event: any) => !isNaN(event.target.value) ? setUtgifterBarnepass(parseInt(event.target.value)) : null}
                    feil={feil}
                />
            </div>
            <div className="input-kroner">
                <Input
                    label="Kontantstøtte per måned (hvis du får)"
                    id="barnetilsyn-kalkulator-input2"
                    bredde="S"
                    placeholder="kr"
                    value={kontaktstotte}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={(event: any) => !isNaN(event.target.value) ? setKontantstotte(event.target.value) : null}
                />
            </div>
            <Knapp className="kalkulator-knapp" onClick={beregn}>Beregn stønad til barnetilsyn</Knapp>
            {visResultat &&
            <div className="alertstripe alertstripe--info">
                <div className="typo-normal alertstripe-avsnitt">
                    <span className="mb-1rem"> Du får ca <strong>{sum} kr</strong> i stønad til barnetilsyn per måned.</span>
                    <span>Når vi har behandlet søknaden din om stønad til barnetilsyn,
                        vil du få vite hva du får utbetalt.</span>
                </div>
            </div>
            }
        </div>
    );
}

export default KalkulatorBarnetilsyn; 