import React, {Fragment} from 'react';
import {useToolbar} from "hooks/useToolbar";

const Page1 = () => {
    useToolbar(() => (
        <div>Page1 item</div>
    ));

    return (
        <Fragment>
            <h1>Page 1</h1>
        </Fragment>
    );
};

export default Page1;