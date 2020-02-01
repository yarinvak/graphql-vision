import React from "react";
// @ts-ignore
import logo from '../../../../graphql-vision.png';

const ErrorContainer: React.FC = () => {
    return (<div>
        <h2>Connection Error</h2>
        <p>
            Cannot connect to the GraphQL Vision Server in order to retrieve information and tracing results.<br/>
            Have you set up a graphql-vision server?<br/>
            Visit the <a href="https://github.com/yarinvak/graphql-vision" target="_blank">Github Project</a> of graphql-vision to learn how to set up a graphql-vision server.<br/><br/>
            <img src={logo} width="150"/>
        </p></div>);
};
export default ErrorContainer;