import React from 'react';
import {Table} from 'react-bootstrap';
import './field-usage-table.css';
import {ServiceVisionContainerProps} from "../fields-container/service-vision-container";

const FieldUsageTable: React.FC<ServiceVisionContainerProps> = (props:ServiceVisionContainerProps) => {
    const data = props.results;
    let sortedData = data.fieldUsages.sort((a: any, b: any) => b.count - a.count);

    let sum = 0;
    sortedData.forEach((field: any) => {
        sum += field.count;
    });

    return (
        <Table bordered striped hover variant="dark" responsive className="Usage-Table">
            <thead>
            <tr>
                <th>Field Path</th>
                <th>Usage Count</th>
                <th>Average Resolving Time (ns)</th>
                <th>Last Request Date</th>
            </tr>
            </thead>
            <tbody>
            {
                sortedData.map(({name, count, averageDuration, lastRequestTime}: { name: string, count: number, averageDuration: number, lastRequestTime: string}, index: number) => {
                    return <tr key={index}>
                        <td>{name}</td>
                        <td>{count} ({Math.round(count * 100 / sum)}%)</td>
                        <td>{averageDuration}</td>
                        <td>{new Date(lastRequestTime).toLocaleString()}</td>
                    </tr>
                })
            }
            </tbody>
        </Table>    );
};


export default FieldUsageTable;
