import React from 'react';
import './App.css';
import MainNavbar from "./components/navbar/navbar";
import FieldUsageTable from "./components/field-usage-table/field-usage-table";
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import FieldUsagePie from "./components/field-usage-pie/field-usage-pie";

const endpoint = 'http://localhost:4000';

const client = new ApolloClient({
    uri: endpoint,
});


const App: React.FC = () => {

    return (
        <ApolloProvider client={client}>
            <div className="App">
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
}

export default App;
