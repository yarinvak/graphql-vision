import React from 'react';
import {Table} from "react-bootstrap";
import './dash-table.css';

export interface TableData {
    columns: {
        name: string;
        label: string;
    }[];
    rows: any[];
}

const DashTable: React.FC<{ data: TableData }> = (props) => {
    const {columns, rows} = props.data;

    return (
        <Table bordered striped hover variant="dark" responsive className="usage-table">
            <thead>
            <tr>
                {
                    columns.map((column, i) => <th key={i}>{column.label}</th>)
                }
            </tr>
            </thead>
            <tbody>
            {
                rows.map((row, i) =>
                    <tr key={i}>
                        {
                            columns.map((column, j) => <td key={j}>{row[column.name]}</td>)
                        }
                    </tr>)
            }
            </tbody>
        </Table>
    );
};

export default DashTable;
