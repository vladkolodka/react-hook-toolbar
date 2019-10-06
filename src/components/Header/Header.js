import React, {Fragment, useContext, } from 'react';
import {ToolbarContextAccessor} from "components/ToolbarContext";



export function Header() {
    const {state: items} = useContext(ToolbarContextAccessor);

    return <Fragment>
        <h1>Header</h1>
        <p>Items:</p>

        <ul>
            {items.map((Component, index) => <li key={index}>{Component}</li>)}
        </ul>
    </Fragment>;
}