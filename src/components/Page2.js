import React, {Fragment, useState} from 'react';
import {useHeaderToolbar} from "./Header/Header";

function Comp({val}) {
    const [v, setV] = useState(1);

    return <div>
        <span>second page, {val} | {v}</span>
        <button onClick={() => setV(2)}>set 2</button>
    </div>;
}

const Page2 = () => {
    const [val, setVal] = useState('123');

    useHeaderToolbar(Comp, {val});

    return (
        <Fragment>
            <h1>Page 2</h1>
            <p>Val: {val}</p>
            <button onClick={() => setVal('fff')}>1</button>
        </Fragment>
    );
};

export default Page2;