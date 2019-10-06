import React, {useState} from 'react';
import {useToolbar} from "./Header/Header";

function Comp2(props) {
    const [val, setVal] = useState(2);

    return <div>
        page2 inner component, val: {val}
        <button onClick={() => setVal(val + 1)}>add</button>
    </div>;
}

function Comp3(props) {
    return <div>
        page3 inner inner component
    </div>;
}

const Page2Inner = () => {
    useToolbar(Comp2, {}, [], 'page2 inner');

    return (
        <div>
            <h2>inner</h2>
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