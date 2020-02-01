import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import MainNavbar from "./navbar/navbar";
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import ServicesPills from "./services-pills/services-pills";
const DashBoard: React.FC<{ endpoint: string, pollInterval: number }> = (props) => {
    const endpoint = props.endpoint;
    const pollInterval = props.pollInterval;

    const client = new ApolloClient({
        uri: endpoint,
    });

    return (
        <ApolloProvider client={client}>
            <div className="Dash">
                <MainNavbar/>
                <div style={{marginBottom: 40}}></div>
                <header className="App-header">
                    <ServicesPills pollInterval={pollInterval}/>
                </header>
            </div>
        </ApolloProvider>
    );
};

export default DashBoard;
