import React from 'react';
import ReactDOM from 'react-dom';

import './dashboard.css';
import MainNavbar from "../navbar/navbar";
import FieldUsageTable from "../field-usage-table/field-usage-table";
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import FieldUsagePie from "../field-usage-pie/field-usage-pie";

const endpoint = 'http://localhost:4000/graphql';

const client = new ApolloClient({
    uri: endpoint,
});

const DashBoard: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <div className="Dash">
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                />
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
