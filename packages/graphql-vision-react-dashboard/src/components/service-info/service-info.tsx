import './service-info.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {gql} from 'apollo-boost';
import {useQuery} from "@apollo/react-hooks";
import ErrorContainer from "../error/error";

const ServiceInfo: React.FC = () => {
    const {loading, error, data} = useQuery(gql`
        {
            serviceInfo{
                url
                lastRequestTime
            }
        }
    `, {pollInterval: 500, fetchPolicy: 'no-cache'});

    if (loading) return (<div className="Service-Info"><p>Loading..</p></div>);
    if (error) return (<div className="Service-Info"><ErrorContainer/></div>);
    let cacheServiceInfo = {url: '----', lastRequestTime: '----'};
    if (data) {
        cacheServiceInfo = data.serviceInfo;
    }
    return (
        <div className="Service-Info">
            <h2>Service Information</h2>
            <ul dir="ltr" className="text-left">
                <li>Monitored Service is <b>{data ? data.serviceInfo.url : cacheServiceInfo.url}</b></li>
                <li>Last Request Received on
                    <b>{data ? data.serviceInfo.lastRequestTime : cacheServiceInfo.lastRequestTime}</b></li>
                <li>Service is <b className="text-success">{error ? 'Dead' : 'Alive'}</b></li>
            </ul>
        </div>
    );
};
export default ServiceInfo;