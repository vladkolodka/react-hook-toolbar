import React, {useReducer, useRef} from "react";

const defaultValue = [(() => <span style={{color: 'red'}}>3</span>)()];
export const ToolbarContextAccessor = React.createContext(defaultValue);

export const toolbarActions = {
    push: 'push',
    pop: 'pop',
    update: 'update'
};

function reducer(state, action) {
    switch (action.type) {
        case toolbarActions.push:
            return [...state, action.payload];
        case toolbarActions.pop:
            return state.filter((_, i) => i !== state.length - 1);
        case toolbarActions.update:
            state[action.payload.index] = action.payload.item;
            return [...state];

        default:
            return state;
    }
}

export function ToolbarContext({children}) {
    const [state, dispatch] = useReducer(reducer, defaultValue);
    const counter = useRef(defaultValue.length - 1);

    return <ToolbarContextAccessor.Provider value={{state, dispatch, counter}}>{children}</ToolbarContextAccessor.Provider>;
}