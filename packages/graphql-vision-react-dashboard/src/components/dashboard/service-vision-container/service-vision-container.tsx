import React from "react";
import FieldUsageTable from "./field-usage-table/field-usage-table";
import FieldUsagePie from "./field-usage-pie/field-usage-pie";
import './service-vision-container.css';
import {useQuery} from "@apollo/react-hooks";
import {gql} from 'apollo-boost';
import ErrorContainer from "./error/error";
import {KeepAlivePoint} from "./keepalive-point/keepalive-point";
import FieldUsageTimeline from "./field-usage-timeline/field-usage-timeline";

export interface ServiceVisionContainerProps {
    results: any;
}

const ServiceVisionContainer: React.FC<{ pollInterval: number, senderId?: string }> = (props: { pollInterval: number, senderId?: string }) => {
    const {senderId, pollInterval} = props;
    const {loading, error, data} = useQuery(gql`
        query($senderId: String){
            fieldUsages(senderId: $senderId){
                name
                count
                averageDuration
                lastRequestTime
            }
        }
    `, {pollInterval, variables: {senderId: senderId}});

    if (loading) return (<div className="Service-Vision"><p>Loading..</p></div>);
    if (error) return (<div className="Service-Vision">
        <ErrorContainer/>
    </div>);
    if (data.fieldUsages.length == 0) return (<div className="Service-Vision"><p>
        Waiting for tracing result...<br/>
        Analytics Information appears once you send your apollo-tracing results from your graphql server to the vision
        server
    </p></div>);
    const header = senderId ? <h4><KeepAlivePoint pollInterval={pollInterval} senderId={senderId}/><span
            className="badge badge-info">{senderId}</span> metrics</h4> :
        <h4>all metrics</h4>;
    return (
        <div className="Service-Vision">
            {header}
            <small>Here are some metrics about the usage of your graphql fields</small>
            <br/>
            <FieldUsageTable results={data}/>
            <hr/>
            <h3>Statistics</h3>
            <div id={"statistics"} className="row" style={{width: "100%", height: 350}}>
                <div style={{display: "inline-block"}} className="col-sm-4">
                    <FieldUsagePie results={data}/>
                </div>
                <div style={{display: "inline-block"}} className="col-sm-5">
                    <FieldUsageTimeline senderId={senderId}/>
                </div>
            </div>
        </div>
    );
};
export default ServiceVisionContainer;
