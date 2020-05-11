import React from 'react';
import Chart from "react-apexcharts";

const FieldUsagePie: React.FC<{ results: any, className?: string }> =
    (props: { results: any, className?: string }) => {
        const {results, className} = props;
        const state = {
            series: results.fieldUsages.map(({count}: { count: number }) => count),
            chartOptions: {
                labels: results.fieldUsages.map(({name}: { name: string }) => name),
                legend: {
                    labels: {
                        colors: "#b7e0ff"
                    }
                },
            }

        };

        return (
            <div className={className}>
                <Chart
                    options={state.chartOptions}
                    series={state.series}
                    type="pie"
                    width={"100%"}
                    height={350}
                />
            </div>
        );
    };


export default FieldUsagePie;
