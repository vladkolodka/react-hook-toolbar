import React, {Fragment} from 'react';
import {useHeaderToolbar} from "./Header/Header";

const Page1 = () => {
    useHeaderToolbar(() => (
        <div>Page1 item</div>
    ));

    return (
        <Fragment>
            <h1>Page 1</h1>
        </Fragment>
    );
};

export default Page1;