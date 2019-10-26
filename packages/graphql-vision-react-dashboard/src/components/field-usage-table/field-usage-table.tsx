import React from 'react';
import {Table} from 'react-bootstrap';
import {gql} from 'apollo-boost';
import {useQuery} from "@apollo/react-hooks";

const FieldUsageTable: React.FC = () => {
    const {loading, error, data} = useQuery(gql`
        {
            fieldUsages{
                name
                count
                averageDuration
            }
        }
    `, {pollInterval: 500});

    if (loading) return (<p>Loading..</p>);
    if (error) return (<p>Error Generating Table</p>);
    if (data.fieldUsages.length == 0) return (<p>
        Waiting for tracing result...<br/>
        Analytics Information appears once you send your apollo-tracing results from your graphql server to the vision server
    </p>);

    let sortedData = data.fieldUsages.sort((a: any, b: any) => b.count - a.count);

    let sum = 0;
    sortedData.forEach((field: any) => {
        sum += field.count;
    });

    return (
        <Table bordered hover>
            <thead>
            <tr>
                <th>Field Path</th>
                <th>Usage Count</th>
                <th>Average Resolving Time (ns)</th>
            </tr>
            </thead>
            <tbody>
            {
                sortedData.map(({name, count, averageDuration}: { name: string, count: number, averageDuration: number }) => {
                    return <tr>
                        <td>{name}</td>
                        <td>{count} ({Math.round(count * 100 / sum)}%)</td>
                        <td>{averageDuration}</td>
                    </tr>
                })
            }
            </tbody>
        </Table>    );
};


export default FieldUsageTable;
