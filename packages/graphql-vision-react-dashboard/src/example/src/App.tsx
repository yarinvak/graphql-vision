import React from 'react';
import './App.css';
import DashBoard from 'graphql-vision-react-dashboard';

const App: React.FC = () => {

    return (
        <div>
            <DashBoard endpoint="/graphql" serviceName="GraphQL Vision"/>
        </div>
    );
};

export default App;
