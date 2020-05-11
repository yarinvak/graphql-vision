import React from 'react';
import ReactApexChart from "react-apexcharts";
import {useQuery} from "@apollo/react-hooks";
import './field-usages-timeline.css';
import {gql} from "apollo-boost";

const FieldUsageTimeline: React.FC<{ senderId?: string, className?: string }> = (props: { senderId?: string, className?: string }) => {
    const {senderId, className} = props;
    const {loading, error, data} = useQuery(gql`
        query($senderId: String){
            timedUsages(senderId: $senderId){
                day
                count
            }
        }
    `, {pollInterval: 3000, variables: {senderId}});


    if (loading) return <span>Loading..</span>
    if (error) return <span>Error..</span>
    const seriesData = data.timedUsages.map((timedUsage: any) => ({
        x: timedUsage.day,
        y: timedUsage.count
    }));

    if (seriesData.length <= 1) {
        return <span></span>;
    }

    const state = {
        series: [{
            name: 'Count of Requests',
            data: seriesData
        }],
        options: {
            chart: {
                type: 'area',
                stacked: false,
                height: 350,
                zoom: {
                    type: 'x',
                    enabled: true,
                    autoScaleYaxis: true
                },
                toolbar: {
                    autoSelected: 'zoom'
                }
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0,
            },
            title: {
                text: 'Usages by dates',
                align: 'left'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: true,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100]
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#b7e0ff"
                    }
                },
                title: {
                    text: 'Count'
                },
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    style: {
                        colors: "#b7e0ff"
                    }
                },
                title: {
                    text: 'Dates'
                }
            },
            tooltip: {
                shared: false,
            }
        },


    };

    return <div id="chart" className={className}>
        <ReactApexChart options={state.options} series={state.series}
                        type="area" height={350}/>
    </div>;
}

export default FieldUsageTimeline;
