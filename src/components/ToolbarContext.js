import React, {useReducer, useRef} from "react";

const defaultValue = [];
export const ToolbarContextAccessor = React.createContext(defaultValue);

export const toolbarActions = {
    push: 'push',
    pop: 'pop',
    update: 'update'
};

function toolbarReducer(state, action) {
    switch (action.type) {
        case toolbarActions.push:
            return [...state, action.payload];
        case toolbarActions.pop:
            state.pop();
            return [...state];
        case toolbarActions.update:
            state[action.payload.index] = action.payload.item;
            return [...state];
        default:
            return state;
    }
}

export function ToolbarContext({children}) {
    const [state, dispatch] = useReducer(toolbarReducer, defaultValue);
    const counter = useRef(defaultValue.length - 1);

    return <ToolbarContextAccessor.Provider value={{state, dispatch, counter}}>{children}</ToolbarContextAccessor.Provider>;
}