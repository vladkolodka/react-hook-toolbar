import React, {useState} from 'react';
import {useToolbar} from "./Header/Header";

function Comp2({prop1}) {
    const [val, setVal] = useState(2);

    return <div>
        page2 | {prop1} | inner component, val: {val}
        <button onClick={() => setVal(val + 1)}>add</button>
    </div>;
}

const Page2Inner = () => {
    const [v, sV] = useState('te');

    useToolbar(Comp2, {prop1: v}, [], 'page2 inner');

    return (
        <div>
            <h2>inner</h2>
            <button onClick={() => sV('changed value')}>setV</button>
            <InnerInner/>
        </div>
    );
};

function InnerInner() {
    useToolbar(() => <span>inner inner</span>, {}, [], 'inner inner');

    return (
        <div>inner inner</div>
    );
}

export default Page2Inner;