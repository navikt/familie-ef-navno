import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';


interface Props {
    checkboxData: any[];
}

const Filtreringsboks: React.FC<Props> = props => {
    return (
        <Panel >
            {props.checkboxData.map((obj: any, index: number) => (
                <CheckboxGruppe legend={obj.groupName} key={index}>
                    {obj.texts.map((text: any, index: number) => (
                        <Checkbox label={text} key={index}></Checkbox>
                    ))}
                </CheckboxGruppe>
            ))}
        </Panel>
    );
}

export default Filtreringsboks;