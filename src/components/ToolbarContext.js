import React, {useReducer, useRef} from "react";
import {produce} from "immer";

const defaultValue = [];
export const ToolbarContextAccessor = React.createContext(defaultValue);

export const toolbarActions = {
    push: 'push',
    pop: 'pop',
    update: 'update'
};

function toolbarReducer(state = [], action) {
    switch (action.type) {
        case toolbarActions.push:
            return produce(state, draft => {
                draft.push(action.payload);
            });

        case toolbarActions.pop:
            return produce(state, draft => {
                draft.pop()
            });

        case toolbarActions.update:
            return produce(state, draft => {
                draft[action.payload.index] = action.payload.item;
            });

        default:
            return state;
    }
}

export function ToolbarContext({children}) {
    const [state, dispatch] = useReducer(toolbarReducer, defaultValue);
    const counter = useRef(defaultValue.length - 1);

    return <ToolbarContextAccessor.Provider
        value={{state, dispatch, counter}}>{children}</ToolbarContextAccessor.Provider>;
}