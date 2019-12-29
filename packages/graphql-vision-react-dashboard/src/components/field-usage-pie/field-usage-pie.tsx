import React from 'react';
import Chart from "react-apexcharts";
import {FieldUsageProps} from "../fields-container/fields-container";

const FieldUsagePie: React.FC<FieldUsageProps> = (props: FieldUsageProps) => {
        const data = props.results;
        const state = {
                series: data.fieldUsages.map(({count}: { count: number }) => count),
                chartOptions: {
                    labels: data.fieldUsages.map(({name}: { name: string }) => name),
                    legend: {
                        labels: {
                            colors: "#b7e0ff"
                        }
                    }
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
