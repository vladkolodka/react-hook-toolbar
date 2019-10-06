import React, {Fragment, useContext, useReducer, useEffect, useMemo} from 'react';

const defaultValue = [(() => <span style={{color: 'red'}}>3</span>)()];
const Context = React.createContext(defaultValue);

export function Header() {
    const {state: items} = useContext(Context);
    console.log(items);
    return <Fragment>
        <h1>Header</h1>
        <p>Items:</p>

        <ul>
            {items.map((Component, index) => <li key={index}>{Component}</li>)}
        </ul>
    </Fragment>;
}

const actions = {
    push: 'push',
    pop: 'pop'
};

function reducer(state, action) {
    switch (action.type) {
        case actions.push:
            return [...state, action.payload];
        case actions.pop:
            return state.filter((_, i) => i !== state.length - 1);
        default:
            return state;
    }
}

export function ToolbarContext({children}) {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    return <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>;
}

export const useToolbar = function (component, props = {}, dependencies = [], name) {
    const {dispatch} = useContext(Context);

    const MemorizedComponent = useMemo(() => component, [component]);

    useEffect(() => {
        console.log(name);

        dispatch({type: actions.push, payload: <MemorizedComponent {...props}/>});

        return () => dispatch({type: actions.pop});

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [dispatch, ...Object.values(props), ...dependencies]);
};