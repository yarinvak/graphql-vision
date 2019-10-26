import React from 'react';
import {gql} from 'apollo-boost';
import {useQuery} from "@apollo/react-hooks";
import Chart from "react-apexcharts";

const FieldUsagePie: React.FC = () => {
        const {loading, error, data} = useQuery(gql`
            {
                fieldUsages{
                    name
                    count
                    averageDuration
                }
            }
        `, {pollInterval: 500});

        if (loading) return (<p>Loading Pie Chart..</p>);
        if (error) return (<p>Error Generating Pie Chart</p>);
        if (data.fieldUsages.length == 0) return (<p>Waiting for tracing result...</p>);

        const state = {
                series: data.fieldUsages.map(({count}: { count: number }) => count),
                chartOptions: {
                    labels: data.fieldUsages.map(({name}: { name: string }) => name),
                }
            }
        ;

        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={state.chartOptions}
                            series={state.series}
                            type="pie"
                            width="500"
                        />
                    </div>
                </div>
            </div>
        );
    }
;


export default FieldUsagePie;
