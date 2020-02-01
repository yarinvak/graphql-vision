import './services-pills.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {gql} from 'apollo-boost';
import {useQuery} from "@apollo/react-hooks";
import {Tab, Tabs} from "react-bootstrap";
import ServiceVisionContainer from "../service-vision-container/service-vision-container";

const ServicesPills: React.FC<{pollInterval: number}> = (props) => {
    const pollInterval = props.pollInterval;
    const {loading, error, data} = useQuery(gql`
        {
            senderIds
        }
    `, {pollInterval, fetchPolicy: 'no-cache'});

    if (!loading && !error) {
        const tabs = data.senderIds.map((x:string)=>{
            const title= (<div><div className="square">{x.toUpperCase().charAt(0)}</div> {x}</div>);
            return (<Tab eventKey={x} title={title}><ServiceVisionContainer pollInterval={pollInterval} senderId={x}/></Tab>);
        });
        return (
            <div className="Services-Pills">
                <Tabs defaultActiveKey="all" id="uncontrolled-tab-example" className="Dashboard-Tabs">
                    <Tab eventKey="all" title="All">
                        <ServiceVisionContainer pollInterval={pollInterval} />
                    </Tab>
                    {tabs}
                </Tabs>
            </div>
        );
    }
    else{
        return (
            <div className="Services-Pills">
                <Tabs defaultActiveKey="all" id="uncontrolled-tab-example" className="Dashboard-Tabs">
                    <Tab eventKey="all" title="All">
                        <ServiceVisionContainer pollInterval={pollInterval} />
                    </Tab>
                </Tabs>
            </div>
        );
    }
};
export default ServicesPills;
