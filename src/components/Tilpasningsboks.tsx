import React, { useState, useEffect } from 'react';
import Panel from 'nav-frontend-paneler';
import { Knapp } from 'nav-frontend-knapper';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import EtikettBase from 'nav-frontend-etiketter';
import Filtreringsboks from './Filtreringsboks';

interface Props {
    filterStatus: boolean[];
    checkboxData: any[];
    handleChange: (filterStatus: boolean[]) => void;
    handleOpen: (open: boolean) => void;
}

const Tilpasningsboks: React.FC<Props> = props => {
    const [showComponent, setShowComponents] = useState(false);
    const [filter, setFilter] = useState<boolean[]>([]);
    const [texts, setTexts] = useState<string[]>([]);
    const [accumulativeTextCount, setAccumulativeTextCount] = useState<number[]>([]);
    const cumulativeSum = (sum => (value: number) => sum += value)(0);
    useEffect(() => {
        if (props.checkboxData.length) {
            setFilter(new Array(props.checkboxData.map((obj: any) => obj.texts.length)
            .reduce((a: number, b: number) => a+b))
            .fill(false));
            setTexts(props.checkboxData.map((obj: any) => obj.texts).flat());
            setAccumulativeTextCount([...[0],...props.checkboxData.map((obj: any) => obj.texts.length)
            .map(cumulativeSum)]);
        }
    }, []);

    const handleButtonClick = () => {
        props.handleChange(filter);
        setShowComponents(!showComponent);
        props.handleOpen(!showComponent);
    }

    const handleCheckboxChange = (int: number) => {
        setFilter(filter.map((filter, index) => index === int ? !filter : filter));
    };

    return (
        <Panel className="tilpasningspanel">
            <Normaltekst >
                Fortell oss litt om situasjonen din,
                så viser vi bare den informasjonen som er
                relevant for deg.
            </Normaltekst>
            {showComponent ? 
                <Filtreringsboks
                checkboxData={props.checkboxData}
                filterStatus={filter}
                handleChange={handleCheckboxChange}
                accumulativeCount={accumulativeTextCount} 
                /> : 
                !props.filterStatus.every( el => el === false) ?
                    <div>
                        <br/>
                        <Normaltekst>
                            Viser informasjon for:
                        </Normaltekst>
                        {texts.map((text: string, index: number) => (
                            props.filterStatus[index] ?
                            <EtikettBase
                            mini 
                            type="info" 
                            key={index}>
                                {text}
                            </EtikettBase> :
                            null
                        ))}
                    </div> :
                    null}
            <Knapp 
            className="tilpasningsknapp"
            onClick={handleButtonClick}
            >
            {showComponent ? 
                <Element>Vis tilpasset <br /> informasjon</Element> :
                props.filterStatus.every( el => el === false) ? 
                    <Element>Tilpass informasjon <br /> til meg</Element> :
                    <Element>Endre situasjon</Element>}
            </Knapp>
        </Panel>
    );
}

export default Tilpasningsboks;