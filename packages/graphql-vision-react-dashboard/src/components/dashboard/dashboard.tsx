import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import MainNavbar from "../navbar/navbar";
import FieldUsageTable from "../field-usage-table/field-usage-table";
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import FieldUsagePie from "../field-usage-pie/field-usage-pie";

const DashBoard: React.FC<{ endpoint: string }> = (props) => {
    const endpoint = props.endpoint;

    const client = new ApolloClient({
        uri: endpoint,
    });

    return (
        <ApolloProvider client={client}>
            <div className="Dash">
                <MainNavbar/>
                <header className="App-header">
                    <span>Endpoint: {endpoint}</span>
                    <FieldUsageTable></FieldUsageTable>
                    <FieldUsagePie></FieldUsagePie>

                </header>
            </div>
        </ApolloProvider>
    );
};

export default DashBoard;
