import React from 'react';
import './field-usage-table.css';
import {ServiceVisionContainerProps} from "../service-vision-container";
import Path from "./path/path";
import Duration from "./duration/duration";
import DashTable, {TableData} from "../../table/dash-table";

const FieldUsageTable: React.FC<ServiceVisionContainerProps> = (props: ServiceVisionContainerProps) => {
    const data = props.results;
    let sortedData = data?.fieldUsages.sort((a: any, b: any) => b.count - a.count);

    let sum = 0;
    sortedData.forEach((field: any) => {
        sum += field.count;
    });

    const tableData: TableData = {
        columns: [
            {name: 'path', label: 'Field Path'},
            {name: 'count', label: 'Usage Count'},
            {name: 'duration', label: 'Average Resolving Time'},
            {name: 'lastRequestDate', label: 'Last Request Date'}
        ],
        rows: sortedData.map((data: any) => ({
            path: <Path path={data.name}/>,
            count: `${data.count} (${Math.round(data.count * 100 / sum)}%)`,
            duration: <Duration duration={data.averageDuration}/>,
            lastRequestDate: new Date(data.lastRequestTime).toLocaleString()
        })),
    };
    return <DashTable data={tableData}/>;
};


export default FieldUsageTable;
