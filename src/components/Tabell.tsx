import React from 'react';

interface Props {
    rows: any[],
}

const Tabell: React.FC<Props> = ({ rows }) => {

    return (
        <table className="tabell" style={{ width: '85%' }}>
            <thead>
                <tr>
                    {rows[0].cells.map((cell: any, index: number) => (
                        <th key={index}>{cell}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.slice(1).map((row: any) => (
                    <tr key={row._key}>
                        {row.cells.map((cell: any, index: number) => (
                            <td key={index}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Tabell;