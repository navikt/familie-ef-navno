import React, { useEffect, useState } from 'react';

interface Props {
    rows: any[],
}

const Tabell: React.FC<Props> = ({ rows }) => {

    return (
        <table className="tabell" style={{width: '85%'}}>
            <thead>
                {rows[0].cells.map((cell: any) => (
                    <th>{cell}</th>
                ))}
            </thead>
            <tbody>
                {rows.slice(1).map((row: any) => (
                    <tr>
                        {row.cells.map((cell: any) => (
                            <td>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Tabell; 