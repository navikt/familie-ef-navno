import React, { useState, useEffect } from 'react';
import Panel from 'nav-frontend-paneler';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';

interface Props {
    checkboxData: any[];
    handleChange: (int: number) => void ;
    filterStatus: boolean[];
    accumulativeCount: number[]
}

const Filtreringsboks: React.FC<Props> = props => {

    return (
        <Panel >
            {props.checkboxData.map((obj: any, index1: number) => (
                <CheckboxGruppe legend={obj.groupName} key={index1}>
                    {obj.texts.map((text: any, index2: number) => (
                        <Checkbox 
                        label={text} 
                        key={index2}
                        onChange={() => props.handleChange(index2 + props.accumulativeCount[index1])}
                        checked={props.filterStatus[index2 + props.accumulativeCount[index1]]}
                        >
                        </Checkbox>   
                    ))}
                </CheckboxGruppe>             
            ))}
        </Panel>
    );
}

export default Filtreringsboks;