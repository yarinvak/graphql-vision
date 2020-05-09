import React from 'react';

const Duration: React.FC<{ duration: number }> = (props: { duration: number }) => {
    const {duration: nanos} = props;
    let type = 'ms';
    let time = 0;
    if (nanos > 1000000000) {
        type = 's';
        time = Math.round(nanos / 1000000000);
    } else if (nanos > 1000000) {
        type = 'ms';
        time = Math.round(nanos / 1000000);
    }
    return <span>{time} ({type})</span>;
}

export default Duration;
