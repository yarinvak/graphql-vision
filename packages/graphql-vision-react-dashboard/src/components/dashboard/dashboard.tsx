import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css';
import MainNavbar from "../navbar/navbar";
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import FieldsContainer from "../fields-container/fields-container";
import {Badge} from "react-bootstrap";

const DashBoard: React.FC<{ endpoint: string, serviceName: string }> = (props) => {
    const endpoint = props.endpoint;

    const client = new ApolloClient({
        uri: endpoint,
    });

    return (
        <ApolloProvider client={client}>
            <div className="Dash">
                <MainNavbar/>
                <header className="App-header">
                    <Badge style={{marginTop: 15, marginBottom: 10}} variant="primary">{props.serviceName} Tracing Listener</Badge>
                    <FieldsContainer/>
                </header>
            </div>
        </ApolloProvider>
    );
};

export default DashBoard;
