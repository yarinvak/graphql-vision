import React from "react";
import FieldUsageTable from "../field-usage-table/field-usage-table";
import FieldUsagePie from "../field-usage-pie/field-usage-pie";
import './fields-container.css';

const FieldsContainer: React.FC = () => {
    return (
        <div className="Fields-Container">
            <FieldUsageTable/>
            <FieldUsagePie></FieldUsagePie>
        </div>
    );
};
export default FieldsContainer;