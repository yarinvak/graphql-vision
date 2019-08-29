import React from 'react';
import './App.css';
import DashBoard from 'graphql-vision-dashboard';

const App: React.FC = () => {

    return (
        <div>
            <DashBoard endpoint="http://localhost:4000/graphql" serviceName="Books Repository" keepAliveUri="http://localhost:4002/keepAlive"/>
        </div>
    );
};

export default App;
