import React from "react";
import FieldUsageTable from "../field-usage-table/field-usage-table";
import FieldUsagePie from "../field-usage-pie/field-usage-pie";
import './fields-container.css';
import {useQuery} from "@apollo/react-hooks";
import {gql} from 'apollo-boost';
import ErrorContainer from "../error/error";

export interface FieldUsageProps {
    results: any;
}

const FieldsContainer: React.FC = () => {
    const {loading, error, data} = useQuery(gql`
        {
            fieldUsages{
                name
                count
                averageDuration
                lastRequestTime
            }
        }
    `, {pollInterval: 500});

    if (loading) return (<div className="Fields-Container"><p>Loading..</p></div>);
    if (error) return (<div className="Fields-Container">
        <ErrorContainer/>
    </div>);
    if (data.fieldUsages.length == 0) return (<div className="Fields-Container"><p>
        Waiting for tracing result...<br/>
        Analytics Information appears once you send your apollo-tracing results from your graphql server to the vision
        server
    </p></div>);

    return (
        <div className="Fields-Container">
            <h2>Fields Usage Metrics</h2>
            <small>Here are some metrics about the usage of your graphql fields</small>
            <br/>
            <FieldUsageTable results={data}/>
            <FieldUsagePie results={data}/>
        </div>
    );
};
export default FieldsContainer;