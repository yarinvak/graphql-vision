import React from 'react';
import './App.css';
import DashBoard from 'graphql-vision-react-dashboard';
import {Helmet} from "react-helmet";

const App: React.FC = () => {

    return (
        <div>
            <Helmet>
                <title>GraphQL Vision</title>
            </Helmet>
            <DashBoard endpoint="http://localhost:4000/graphql" pollInterval={1000}/>
        </div>
    );
};

export default App;
