import React from 'react';

const Path: React.FC<{ path: string }> = (props: { path: string }) => {
    const splittedPath = props.path.split('/');

    return (
        <div className="path-container">
            {
                splittedPath.map((part, i) => {
                    if (part !== '') {
                        let arrow;
                        let badgeColor = 'badge-warning';
                        if (i < splittedPath.length - 1) {
                            arrow = <span>&nbsp;/&nbsp;</span>
                            badgeColor = 'badge-light';
                        }
                        return <div key={i} style={{display: 'inline-block'}}>
                            <span className={"badge " + badgeColor}>{part}</span>
                            {arrow}
                        </div>
                    }
                })
            }
        </div>
    );
};

export default Path;
